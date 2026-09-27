import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Toast } from './components/common/Toast';
import { ConnectWalletModal } from './components/modals/ConnectWalletModal';
import { ScrollToTop } from './components/common/ScrollToTop';

// Pages
import { Home } from './pages/Home';
import { Programs } from './pages/Programs';
import { ProgramDetail } from './pages/ProgramDetail';
import { Merchants } from './pages/Merchants';
import { StudentDashboard } from './pages/StudentDashboard';
import { DonorDashboard } from './pages/DonorDashboard';
import { Explorer } from './pages/Explorer';
import { NotFound } from './pages/NotFound';

const AppContent: React.FC = () => {
  const location = useLocation();
  const isNotFound = !['/', '/programs', '/merchants', '/student', '/donor', '/explorer'].some(
    (path) => location.pathname === path || location.pathname.startsWith('/programs/')
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F7FF] text-[#0B1240]">
      <ScrollToTop />
      {!isNotFound && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/programs/:id" element={<ProgramDetail />} />
          <Route path="/merchants" element={<Merchants />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/donor" element={<DonorDashboard />} />
          <Route path="/explorer" element={<Explorer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isNotFound && <Footer />}
      <Toast />
      <ConnectWalletModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <WalletProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </WalletProvider>
  );
};

export default App;
