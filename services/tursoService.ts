
export interface TursoResponse {
  results: {
    columns: string[];
    rows: any[][];
    rows_read: number;
    rows_written: number;
    query: { sql: string };
    error?: { message: string };
  }[];
  error?: { message: string };
}

// Helper to sanitize URL
const getBaseUrl = (url: string) => {
    // Remove existing protocols
    let cleanUrl = url.trim().replace(/^(libsql|wss|http):\/\//, '');
    
    // Handle https specifically or default to it
    cleanUrl = cleanUrl.replace(/^https:\/\//, '');
    
    // Re-add https
    return `https://${cleanUrl.replace(/\/$/, "")}`;
};

export const tursoService = {
  // Execute SQL via HTTP
  async execute(dbUrl: string, authToken: string, sql: string, args: any[] = []) {
    const baseUrl = getBaseUrl(dbUrl);
    const url = `${baseUrl}/v2/pipeline`;
    
    // Simple retry logic to handle cold starts or transient network blips
    const maxRetries = 2;
    let lastError;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    requests: [
                        { type: "execute", stmt: { sql, args } },
                        { type: "close" }
                    ]
                }),
                credentials: 'omit' // Do not send cookies
            });

            if (!response.ok) {
                const text = await response.text();
                throw new Error(`Turso API HTTP Error: ${response.status} - ${text}`);
            }

            const json = await response.json() as TursoResponse;
            
            // Check for application level errors in the response
            if (json.error) {
                throw new Error(`Turso API Error: ${json.error.message}`);
            }
            if (json.results && json.results[0] && json.results[0].error) {
                throw new Error(`SQL Error: ${json.results[0].error.message}`);
            }

            return json;
        } catch (error: any) {
            lastError = error;
            const isNetworkError = error.name === 'TypeError' || error.message.includes('NetworkError') || error.message.includes('Failed to fetch');
            
            // If it's a network error (potential cold start), wait and retry
            if (isNetworkError && attempt < maxRetries) {
                console.log(`Turso request failed (Attempt ${attempt + 1}/${maxRetries + 1}). Retrying in 1s...`);
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }
            
            // For other errors (Auth, SQL syntax), fail immediately
            break;
        }
    }
    
    throw lastError;
  },

  async initTable(dbUrl: string, authToken: string) {
    // Create a simple key-value table to store the entire app state JSON
    const sql = `CREATE TABLE IF NOT EXISTS app_settings (id INTEGER PRIMARY KEY, data TEXT)`;
    return this.execute(dbUrl, authToken, sql);
  },

  async saveData(dbUrl: string, authToken: string, jsonData: string) {
    // Ensure table exists first (lazy init)
    try {
        await this.initTable(dbUrl, authToken);
    } catch (e) {
        // Ignore init error, maybe table exists or permissions issue, try insert anyway
        console.warn("Auto-init table failed, attempting save anyway:", e);
    }
    
    // Insert or Replace ID 1
    const sql = `INSERT INTO app_settings (id, data) VALUES (1, ?) ON CONFLICT(id) DO UPDATE SET data=excluded.data`;
    return this.execute(dbUrl, authToken, sql, [jsonData]);
  },

  async loadData(dbUrl: string, authToken: string) {
     try {
         // Check if table exists first by trying to query it
         const sql = `SELECT data FROM app_settings WHERE id = 1`;
         const result = await this.execute(dbUrl, authToken, sql);
         
         if (result.results && result.results[0]?.rows?.length > 0) {
             const jsonString = result.results[0].rows[0][0]; // First row, first column
             return JSON.parse(jsonString);
         }
         return null;
     } catch (e: any) {
         const msg = e.message || e.toString();
         
         // Handle "no such table" specifically
         if (msg.includes("no such table")) {
             console.log("Turso table not found. Attempting to initialize...");
             try {
                 await this.initTable(dbUrl, authToken);
                 console.log("Turso table initialized.");
             } catch (initErr) {
                 console.warn("Failed to auto-initialize table:", initErr);
             }
             return null;
         }

         // Handle Network Errors gracefully
         if (msg.includes("NetworkError") || msg.includes("Failed to fetch") || msg.includes("TypeError")) {
             console.warn("Turso connection issue (Offline, Blocked, or Sleeping DB):", msg);
             // Do not throw, just return null so app uses local storage
             return null;
         }

         console.warn("Could not load data from Turso:", msg);
         return null;
     }
  },

  async testConnection(dbUrl: string, authToken: string): Promise<boolean> {
      try {
          // Simple lightweight query to check connection
          const sql = `SELECT 1`;
          await this.execute(dbUrl, authToken, sql);
          return true;
      } catch (e) {
          console.error("Turso Connection Test Failed:", e);
          return false;
      }
  }
};
