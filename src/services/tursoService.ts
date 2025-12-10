export interface TursoResponse {
  results: {
    columns: string[];
    rows: any[][];
    rows_read: number;
    rows_written: number;
    query: { sql: string };
  }[];
}

// Helper to sanitize URL
const getBaseUrl = (url: string) => {
    let cleanUrl = url.replace('libsql://', 'https://').replace('wss://', 'https://');
    if (!cleanUrl.startsWith('https://')) {
        cleanUrl = `https://${cleanUrl}`;
    }
    return cleanUrl;
};

export const tursoService = {
  // Execute SQL via HTTP
  async execute(dbUrl: string, authToken: string, sql: string, args: any[] = []) {
    const baseUrl = getBaseUrl(dbUrl);
    const url = `${baseUrl}/v2/pipeline`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requests: [
          { type: "execute", stmt: { sql, args } },
          { type: "close" }
        ]
      })
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Turso API Error: ${text}`);
    }

    return await response.json() as TursoResponse;
  },

  async initTable(dbUrl: string, authToken: string) {
    // Create a simple key-value table to store the entire app state JSON
    const sql = `CREATE TABLE IF NOT EXISTS app_settings (id INTEGER PRIMARY KEY, data TEXT)`;
    return this.execute(dbUrl, authToken, sql);
  },

  async saveData(dbUrl: string, authToken: string, jsonData: string) {
    // Ensure table exists first (lazy init)
    await this.initTable(dbUrl, authToken);
    
    // Insert or Replace ID 1
    const sql = `INSERT INTO app_settings (id, data) VALUES (1, ?) ON CONFLICT(id) DO UPDATE SET data=excluded.data`;
    return this.execute(dbUrl, authToken, sql, [jsonData]);
  },

  async loadData(dbUrl: string, authToken: string) {
     try {
         const sql = `SELECT data FROM app_settings WHERE id = 1`;
         const result = await this.execute(dbUrl, authToken, sql);
         
         if (result.results[0]?.rows?.length > 0) {
             const jsonString = result.results[0].rows[0][0]; // First row, first column
             return JSON.parse(jsonString);
         }
         return null;
     } catch (e) {
         console.warn("Could not load data from Turso (Table might not exist yet)", e);
         return null;
     }
  }
};