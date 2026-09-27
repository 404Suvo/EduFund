import React from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';

export const Toast: React.FC = () => {
  const { toastMessage, clearToast } = useWallet();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center gap-3 px-5 py-3.5 bg-[#0B1240] text-white rounded-[16px] border-2 border-[#14F5B0] shadow-2xl">
        <CheckCircle2 className="w-5 h-5 text-[#14F5B0] shrink-0" />
        <span className="text-sm font-semibold">{toastMessage}</span>
        <button
          onClick={clearToast}
          className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors ml-2"
          aria-label="Dismiss toast"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
