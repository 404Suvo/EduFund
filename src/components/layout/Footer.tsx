import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ShieldCheck, Heart, Send, MessageSquare } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B1240] text-white pt-16 pb-12 border-t-4 border-[#1F2BFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#1F2BFF] flex items-center justify-center text-white shadow-lg">
                <GraduationCap className="w-6 h-6 text-[#14F5B0]" />
              </div>
              <span className="font-display text-3xl tracking-wider text-white">
                EDUFUND
              </span>
            </Link>
            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              The blockchain-powered scholarship protocol that transforms educational grants into purpose-bound smart tokens. Ensuring 100% transparency, zero leakage, and direct student empowerment.
            </p>

            {/* Social Icons in circular buttons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#1F2BFF] hover:scale-110 flex items-center justify-center text-white transition-all cursor-pointer"
                aria-label="X (Twitter)"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#1F2BFF] hover:scale-110 flex items-center justify-center text-white transition-all cursor-pointer"
                aria-label="Discord"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#1F2BFF] hover:scale-110 flex items-center justify-center text-white transition-all cursor-pointer"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#1F2BFF] hover:scale-110 flex items-center justify-center text-white transition-all cursor-pointer"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#14F5B0] mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link to="/programs" className="hover:text-white transition-colors">
                  Scholarship Programs
                </Link>
              </li>
              <li>
                <Link to="/merchants" className="hover:text-white transition-colors">
                  Approved Merchants
                </Link>
              </li>
              <li>
                <Link to="/donor" className="hover:text-white transition-colors">
                  Donor Impact Portal
                </Link>
              </li>
              <li>
                <Link to="/student" className="hover:text-white transition-colors">
                  Student Token Wallet
                </Link>
              </li>
              <li>
                <Link to="/explorer" className="hover:text-white transition-colors">
                  On-Chain Explorer
                </Link>
              </li>
            </ul>
          </div>

          {/* For Stakeholders */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#FFB300] mb-4">
              Stakeholders
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link to="/donor" className="hover:text-white transition-colors">
                  Corporate CSR Sponsors
                </Link>
              </li>
              <li>
                <Link to="/merchants" className="hover:text-white transition-colors">
                  Merchant Onboarding
                </Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-white transition-colors">
                  University Registrars
                </Link>
              </li>
              <li>
                <a href="#audit" className="hover:text-white transition-colors">
                  Statutory Audit Reports
                </a>
              </li>
              <li>
                <a href="#compliance" className="hover:text-white transition-colors">
                  FCRA & CSR-1 Compliance
                </a>
              </li>
            </ul>
          </div>

          {/* Trust & Network */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#6ECFE0] mb-4">
              Protocol
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#14F5B0]" />
                <span className="font-mono">Smart Vault: Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#14F5B0]" />
                <span className="font-mono">Peg: 1:1 INR Sovereign</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#14F5B0]" />
                <span>Zero Non-Edu Leakage</span>
              </div>
              <p className="text-[11px] text-slate-400 pt-2">
                Audited by CertiK and OpenZeppelin smart contract verification suites.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} EduFund Protocol. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-2 text-[#14F5B0] font-medium">
            <span>Built on blockchain</span>
            <span>•</span>
            <span>Every rupee traceable</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Grant</a>
            <a href="#security" className="hover:text-white transition-colors">Bug Bounty</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
