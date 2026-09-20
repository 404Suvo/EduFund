import React from 'react';
import { GraduationCap, Shield, BookOpen, HeartHandshake, Settings, ExternalLink, FileText } from 'lucide-react';
import { WalletConnect } from './WalletConnect';

interface Props {
  children: React.ReactNode;
  userRole: 'student' | 'donor' | 'admin';
  setUserRole: (role: 'student' | 'donor' | 'admin') => void;
}

export const Layout: React.FC<Props> = ({ children, userRole, setUserRole }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#070b19] text-slate-100 relative">
      {/* Background Decorative Gradient Blobs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="fixed bottom-10 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      {/* Top Navigation Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-midnight-900/80 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-cyan-300">
                  EduFund
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/40">
                  Midnight Preprod
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Transparent Grants • Zero-Knowledge Student Privacy
              </p>
            </div>
          </div>

          {/* Role Navigation Pills */}
          <nav className="hidden md:flex items-center p-1 rounded-xl bg-midnight-800/90 border border-slate-700/60">
            <button
              onClick={() => setUserRole('student')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                userRole === 'student'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Student Portal (ZK)</span>
            </button>
            <button
              onClick={() => setUserRole('donor')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                userRole === 'donor'
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md shadow-purple-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Donor Treasury</span>
            </button>
            <button
              onClick={() => setUserRole('admin')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                userRole === 'admin'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
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
        <div className="flex md:hidden px-4 py-2 border-t border-slate-800/60 justify-around bg-midnight-900/95 text-xs">
          <button
            onClick={() => setUserRole('student')}
            className={`px-3 py-1 rounded-lg ${userRole === 'student' ? 'bg-cyan-500 text-white' : 'text-slate-400'}`}
          >
            Student (ZK)
          </button>
          <button
            onClick={() => setUserRole('donor')}
            className={`px-3 py-1 rounded-lg ${userRole === 'donor' ? 'bg-purple-500 text-white' : 'text-slate-400'}`}
          >
            Donor Treasury
          </button>
          <button
            onClick={() => setUserRole('admin')}
            className={`px-3 py-1 rounded-lg ${userRole === 'admin' ? 'bg-amber-500 text-white' : 'text-slate-400'}`}
          >
            Admin
          </button>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-midnight-900/60 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">EduFund</span>
            <span>•</span>
            <span>Built for the Midnight Builder Challenge (Level 4)</span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://docs.midnight.network"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 flex items-center gap-1 transition-colors"
            >
              <span>Midnight Docs</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="#usage-guide"
              onClick={(e) => {
                e.preventDefault();
                alert('See docs/USAGE.md for the step-by-step user guide!');
              }}
              className="hover:text-cyan-400 flex items-center gap-1 transition-colors"
            >
              <FileText className="w-3 h-3" />
              <span>Usage Guide</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
