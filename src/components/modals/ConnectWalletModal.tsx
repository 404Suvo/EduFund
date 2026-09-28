import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useWallet, UserRole } from '../../context/WalletContext';
import { Button } from '../common/Button';
import { Wallet, ShieldCheck, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

export const ConnectWalletModal: React.FC = () => {
  const { 
    isConnectModalOpen, 
    closeConnectModal, 
    connectWallet, 
    userRole, 
    setUserRole,
    isConnected,
    disconnectWallet,
    walletAddress
  } = useWallet();

  const [selectedRole, setSelectedRole] = useState<UserRole>(userRole);

  const providers = [
    {
      id: 'demo',
      name: 'Demo Instant Sandbox',
      tag: 'Recommended (Zero Setup)',
      icon: '⚡',
      desc: 'Instantly loads pre-funded student and donor test accounts.',
      badge: 'Fastest',
    },
    {
      id: 'lace',
      name: 'Midnight Lace Wallet',
      tag: 'Zero-Knowledge Native',
      icon: '🌙',
      desc: 'Hardware-backed zero-knowledge proof credentials.',
      badge: 'Privacy',
    },
    {
      id: 'metamask',
      name: 'MetaMask / Web3',
      tag: 'EVM Standard',
      icon: '🦊',
      desc: 'Connect with standard browser extension or mobile wallet.',
      badge: 'Popular',
    },
    {
      id: 'phantom',
      name: 'Phantom / Sol',
      tag: 'Multi-Chain',
      icon: '👻',
      desc: 'Seamless Web3 login with biometric key management.',
      badge: 'Multi-chain',
    },
  ];

  const handleConnect = (providerId: string) => {
    connectWallet(providerId, selectedRole);
  };

  return (
    <Modal
      isOpen={isConnectModalOpen}
      onClose={closeConnectModal}
      title={isConnected ? "Wallet Details" : "Connect to EduFund"}
      subtitle={isConnected ? "Manage your connected Web3 identity" : "Choose a wallet or try the demo sandbox to interact"}
      maxWidth="md"
    >
      {isConnected ? (
        <div className="space-y-5">
          <div className="p-4 rounded-2xl bg-[#0B1240] text-white space-y-2 border-2 border-[#14F5B0]">
            <div className="text-xs text-[#14F5B0] font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#14F5B0] animate-pulse" />
              Connected & Verified On-Chain
            </div>
            <div className="font-mono text-sm break-all font-semibold">
              {walletAddress}
            </div>
            <div className="text-xs text-slate-300 pt-1 flex items-center justify-between">
              <span>Active Persona: <strong className="text-white capitalize">{userRole}</strong></span>
              <span className="text-[#C8F560]">Network: Sovereign Testnet</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              size="md"
              className="flex-1"
              onClick={closeConnectModal}
            >
              Close
            </Button>
            <Button
              variant="primary"
              size="md"
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              onClick={() => {
                disconnectWallet();
                closeConnectModal();
              }}
            >
              Disconnect
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Persona selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Select Starting Role:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedRole('student')}
                className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                  selectedRole === 'student'
                    ? 'border-[#1F2BFF] bg-[#1F2BFF]/10 text-[#1F2BFF] font-bold shadow-sm'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="text-xs font-bold">Student Persona</div>
                <div className="text-[10px] text-slate-500">STU-9402 • Aarav S.</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('donor')}
                className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                  selectedRole === 'donor'
                    ? 'border-[#1F2BFF] bg-[#1F2BFF]/10 text-[#1F2BFF] font-bold shadow-sm'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="text-xs font-bold">Donor CSR Persona</div>
                <div className="text-[10px] text-slate-500">Acme Technologies CSR</div>
              </button>
            </div>
          </div>

          {/* Providers list */}
          <div className="space-y-2.5">
            {providers.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => handleConnect(p.id)}
                className="w-full p-3.5 rounded-2xl border border-slate-200 hover:border-[#1F2BFF] hover:bg-slate-50 flex items-center justify-between transition-all group cursor-pointer text-left bg-white"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl p-2 rounded-xl bg-slate-100 group-hover:bg-[#1F2BFF]/10 transition-colors">
                    {p.icon}
                  </span>
                  <div>
                    <div className="text-sm font-bold text-[#0B1240] flex items-center gap-2">
                      <span>{p.name}</span>
                      {p.badge && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-[#14F5B0]/20 text-[#008A5E]">
                          {p.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500">{p.desc}</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#1F2BFF] group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-[#14F5B0]/10 border border-[#14F5B0]/40 text-[11px] text-[#008A5E] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#008A5E] shrink-0" />
            <span>EduFund is connected directly to Midnight Preprod Testnet (Lace / Midnight Wallet ready).</span>
          </div>
        </div>
      )}
    </Modal>
  );
};
