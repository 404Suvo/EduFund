import React from 'react';
import { GraduationCap, Shield, HeartHandshake, Settings, ExternalLink, FileText } from 'lucide-react';
import { WalletConnect } from './WalletConnect';

interface Props {
  children: React.ReactNode;
  userRole: 'student' | 'donor' | 'admin';
  setUserRole: (role: 'student' | 'donor' | 'admin') => void;
}

export const Layout: React.FC<Props> = ({ children, userRole, setUserRole }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FF] text-[#0B0F3B] relative font-sans">
      {/* Top Navigation Header: Clean White Bar with Soft Shadow */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200/80 shadow-educhain-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#1F2BFF] text-white shadow-md shadow-[#1F2BFF]/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-[#0B0F3B]">
                  EduFund
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1F2BFF] border border-blue-200">
                  Midnight Preprod
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Transparent Grants • Zero-Knowledge Student Privacy
              </p>
            </div>
          </div>

          {/* Centered Navigation Filter Tabs: White Pill Container */}
          <nav className="hidden md:flex items-center p-1.5 rounded-full bg-slate-100/90 border border-slate-200/80 shadow-inner">
            <button
              onClick={() => setUserRole('student')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                userRole === 'student'
                  ? 'bg-[#1F2BFF] text-white shadow-md shadow-[#1F2BFF]/25'
                  : 'text-[#0B0F3B] hover:text-[#1F2BFF] hover:bg-white/60'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Student Portal (ZK)</span>
            </button>
            <button
              onClick={() => setUserRole('donor')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                userRole === 'donor'
                  ? 'bg-[#1F2BFF] text-white shadow-md shadow-[#1F2BFF]/25'
                  : 'text-[#0B0F3B] hover:text-[#1F2BFF] hover:bg-white/60'
              }`}
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Donor Treasury</span>
            </button>
            <button
              onClick={() => setUserRole('admin')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                userRole === 'admin'
                  ? 'bg-[#1F2BFF] text-white shadow-md shadow-[#1F2BFF]/25'
                  : 'text-[#0B0F3B] hover:text-[#1F2BFF] hover:bg-white/60'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Merchant Registry</span>
            </button>
          </nav>

          {/* Wallet Connect */}
          <WalletConnect />
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="flex md:hidden px-4 py-2 border-t border-slate-100 justify-around bg-white text-xs font-semibold">
          <button
            onClick={() => setUserRole('student')}
            className={`px-3.5 py-1.5 rounded-full ${
              userRole === 'student' ? 'bg-[#1F2BFF] text-white' : 'text-slate-600'
            }`}
          >
            Student (ZK)
          </button>
          <button
            onClick={() => setUserRole('donor')}
            className={`px-3.5 py-1.5 rounded-full ${
              userRole === 'donor' ? 'bg-[#1F2BFF] text-white' : 'text-slate-600'
            }`}
          >
            Donor Treasury
          </button>
          <button
            onClick={() => setUserRole('admin')}
            className={`px-3.5 py-1.5 rounded-full ${
              userRole === 'admin' ? 'bg-[#1F2BFF] text-white' : 'text-slate-600'
            }`}
          >
            Admin
          </button>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {children}
      </main>

      {/* Clean White Footer */}
      <footer className="border-t border-slate-200 bg-white mt-16 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0B0F3B]">EduFund</span>
            <span>•</span>
            <span>Built for the Midnight Builder Challenge (Level 4)</span>
          </div>
          <div className="flex items-center gap-6 font-medium">
            <a
              href="https://docs.midnight.network"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-[#1F2BFF] flex items-center gap-1 transition-colors"
            >
              <span>Midnight Docs</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="#usage-guide"
              onClick={(e) => {
                e.preventDefault();
                alert('See docs/USAGE.md for the step-by-step user guide!');
              }}
              className="text-slate-600 hover:text-[#1F2BFF] flex items-center gap-1 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Usage Guide</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
