import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Wallet, 
  Menu, 
  X, 
  ChevronDown, 
  Check, 
  ShieldCheck, 
  Users, 
  Send, 
  MessageSquare
} from 'lucide-react';
import { useWallet, UserRole } from '../../context/WalletContext';
import { Button } from '../common/Button';
import { truncateHash } from '../../utils/format';

export const Navbar: React.FC = () => {
  const { 
    isConnected, 
    walletAddress, 
    openConnectModal, 
    disconnectWallet, 
    userRole, 
    setUserRole 
  } = useWallet();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [communityDropdownOpen, setCommunityDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Programs', href: '/programs' },
    { label: 'Merchants', href: '/merchants' },
    { label: 'Donors', href: '/donor' },
    { label: 'Student', href: '/student' },
    { label: 'Explorer', href: '/explorer' },
  ];

  const roles: { role: UserRole; label: string; desc: string }[] = [
    { role: 'student', label: 'Student Mode', desc: 'STU-9402 Aarav S.' },
    { role: 'donor', label: 'Donor Mode', desc: 'Acme Technologies CSR' },
    { role: 'merchant', label: 'Merchant Mode', desc: 'BookNest Pune' },
    { role: 'admin', label: 'Admin Mode', desc: 'University Auditor' },
  ];

  const isActive = (href: string) => {
    if (href.startsWith('/#')) return false;
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Logo Left */}
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 p-0.5 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform overflow-hidden">
            <img src="/logo.png" alt="EduFund Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-2xl sm:text-3xl tracking-wider text-[#0B1240] leading-none">
              EDUFUND
            </span>
            <span className="h-1 w-full bg-[#1F2BFF] rounded-full mt-0.5" />
          </div>
        </Link>

        {/* Center Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`px-3 py-2 rounded-full text-sm font-semibold transition-all ${
                isActive(item.href)
                  ? 'bg-[#1F2BFF]/10 text-[#1F2BFF]'
                  : 'text-slate-600 hover:text-[#0B1240] hover:bg-slate-100/80'
              }`}
            >
              {item.label}
            </Link>
          ))}

          {/* Community Dropdown */}
          <div className="relative">
            <button
              onClick={() => setCommunityDropdownOpen(!communityDropdownOpen)}
              onBlur={() => setTimeout(() => setCommunityDropdownOpen(false), 200)}
              className="flex items-center gap-1 px-3 py-2 rounded-full text-sm font-semibold text-slate-600 hover:text-[#0B1240] hover:bg-slate-100/80 transition-all cursor-pointer"
            >
              <span>Community</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${communityDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {communityDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-[18px] border-2 border-[#0B1240] shadow-neo p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-[#0B1240] rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-[#1F2BFF]" />
                  <span>Discord Community</span>
                </a>
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-[#0B1240] rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <Send className="w-4 h-4 text-[#6ECFE0]" />
                  <span>Telegram Channel</span>
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-[#0B1240] rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <svg className="w-4 h-4 text-[#0B1240] fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                  <span>GitHub Repository</span>
                </a>
                <a
                  href="#forum"
                  className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-[#0B1240] rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <Users className="w-4 h-4 text-[#00A651]" />
                  <span>Student DAO Forum</span>
                </a>
              </div>
            )}
          </div>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Quick Role Switcher Pill (Desktop & Tablet) */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              onBlur={() => setTimeout(() => setRoleDropdownOpen(false), 200)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
              title="Switch demo role"
            >
              <span className="w-2 h-2 rounded-full bg-[#14F5B0]" />
              <span className="capitalize">{userRole}</span>
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-[18px] border-2 border-[#0B1240] shadow-neo p-2 z-50 animate-in fade-in duration-150">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
                  Switch Active Role
                </div>
                {roles.map((r) => (
                  <button
                    key={r.role}
                    onClick={() => {
                      setUserRole(r.role);
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between text-xs transition-colors cursor-pointer ${
                      userRole === r.role 
                        ? 'bg-[#1F2BFF]/10 text-[#1F2BFF] font-bold' 
                        : 'hover:bg-slate-100 text-[#0B1240]'
                    }`}
                  >
                    <div>
                      <div className="font-semibold">{r.label}</div>
                      <div className="text-[10px] text-slate-500">{r.desc}</div>
                    </div>
                    {userRole === r.role && <Check className="w-4 h-4 text-[#1F2BFF]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Connect / Connected Wallet Pill (Desktop & Tablet) */}
          <div className="hidden sm:flex items-center">
            {isConnected ? (
              <button
                onClick={openConnectModal}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-[#0B1240] text-white hover:bg-[#141E55] border border-transparent transition-all shadow-sm cursor-pointer"
              >
                <div className="w-2 h-2 rounded-full bg-[#14F5B0] animate-pulse" />
                <span>{truncateHash(walletAddress, 6, 4)}</span>
              </button>
            ) : (
              <Button
                variant="primary"
                size="md"
                icon={<Wallet className="w-4 h-4 text-[#14F5B0]" />}
                onClick={openConnectModal}
              >
                Connect Wallet
              </Button>
            )}
          </div>

          {/* Mobile/Tablet Menu Button (Visible < lg) */}
          <div className="flex lg:hidden items-center gap-1.5">
            {isConnected && (
              <button
                onClick={openConnectModal}
                className="sm:hidden p-2 rounded-full bg-slate-100 text-[#0B1240]"
                aria-label="Wallet details"
              >
                <Wallet className="w-4 h-4 text-[#1F2BFF]" />
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#0B1240] hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b-2 border-[#0B1240] px-4 pt-3 pb-6 space-y-4 animate-in fade-in duration-200 shadow-xl">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-2xl text-sm font-bold flex items-center justify-between ${
                  isActive(item.href)
                    ? 'bg-[#1F2BFF] text-white'
                    : 'bg-slate-100 text-[#0B1240] hover:bg-slate-200'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Role Switcher */}
          <div className="pt-1">
            <div className="text-xs font-bold text-slate-500 mb-2">Switch Active Persona:</div>
            <div className="grid grid-cols-2 gap-2">
              {roles.map((r) => (
                <button
                  key={r.role}
                  onClick={() => {
                    setUserRole(r.role);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold text-left border ${
                    userRole === r.role
                      ? 'border-[#1F2BFF] bg-[#1F2BFF]/10 text-[#1F2BFF]'
                      : 'border-slate-200 text-slate-700 bg-white'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-1">
            {isConnected ? (
              <Button
                variant="outline"
                size="md"
                className="w-full"
                onClick={() => {
                  disconnectWallet();
                  setMobileMenuOpen(false);
                }}
              >
                Disconnect ({truncateHash(walletAddress, 6, 4)})
              </Button>
            ) : (
              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => {
                  openConnectModal();
                  setMobileMenuOpen(false);
                }}
              >
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
