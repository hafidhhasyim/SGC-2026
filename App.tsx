import React, { useState } from 'react';
import { MemoryRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { DataProvider, useData } from './contexts/DataContext';

// Pages
import Home from './pages/Home';
import Categories from './pages/Categories';
import JuknisPage from './pages/JuknisPage';
import FaqPage from './pages/FaqPage';
import AdminDashboard from './pages/AdminDashboard';
import CheckStatusPage from './pages/CheckStatusPage';
import ParticipantListPage from './pages/ParticipantListPage';

// Layout Component to conditionally render Navbar/Footer
const Layout: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const location = useLocation();
    const isAdmin = location.pathname.startsWith('/admin');
    const { registrationUrl } = useData();

    const handleRegisterClick = (eventName?: string) => {
        if (registrationUrl && registrationUrl !== '#' && registrationUrl.trim() !== '') {
            window.open(registrationUrl, '_blank');
        } else {
            alert("Mohon maaf, link pendaftaran belum tersedia saat ini.");
        }
    };

    // Safe cloning of children with new props
    const content = React.isValidElement(children) 
        ? React.cloneElement(children, { onRegisterClick: handleRegisterClick } as any)
        : children;

    return (
        <div className="min-h-screen flex flex-col">
            {!isAdmin && <Navbar onRegisterClick={() => handleRegisterClick()} />}
            
            <main className="flex-grow">
                {content}
            </main>

            {!isAdmin && <Footer />}
        </div>
    );
};

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout><Home onRegisterClick={() => {}} /></Layout>} />
            <Route path="/categories" element={<Layout><Categories onRegisterClick={() => {}} /></Layout>} />
            <Route path="/participants" element={<Layout><ParticipantListPage /></Layout>} />
            <Route path="/juknis" element={<Layout><JuknisPage /></Layout>} />
            <Route path="/faq" element={<Layout><FaqPage /></Layout>} />
            <Route path="/check-status" element={<Layout><CheckStatusPage /></Layout>} />
            <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
    );
}

const App: React.FC = () => {
  return (
    <DataProvider>
        <Router>
            <AppRoutes />
        </Router>
    </DataProvider>
  );
};

export default App;