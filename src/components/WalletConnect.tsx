import React from 'react';
import { Wallet, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { useMidnight } from '../hooks/useMidnight';

export const WalletConnect: React.FC = () => {
  const { isConnected, isConnecting, address, balance, networkId, error, connect, disconnect } = useMidnight();

  const formattedAddress = address
    ? `${address.slice(0, 10)}...${address.slice(-6)}`
    : '';

  const formattedBalance = (Number(balance) / 1_000_000).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="flex items-center gap-3">
      {error && (
        <div className="hidden lg:flex items-center gap-1.5 text-xs text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-xl font-medium">
          <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
          <span>{error}</span>
        </div>
      )}

      {isConnected ? (
        <div className="flex items-center gap-2">
          {/* Network Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Midnight {networkId.toUpperCase()}</span>
          </div>

          {/* Balance Pill */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs">
            <span className="text-slate-400">Balance:</span>
            <span className="font-bold text-[#1F2BFF]">{formattedBalance} tNIGHT</span>
          </div>

          {/* Account & Disconnect Button */}
          <button
            onClick={disconnect}
            title="Click to disconnect"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white hover:bg-rose-50 hover:border-rose-300 border border-slate-200 text-[#0B0F3B] text-xs font-mono shadow-sm transition-all group"
          >
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500 group-hover:hidden" />
            <RefreshCw className="w-3.5 h-3.5 text-rose-500 hidden group-hover:inline animate-spin" />
            <span className="group-hover:text-rose-600 font-semibold">{formattedAddress}</span>
          </button>
        </div>
      ) : (
        <button
          onClick={connect}
          disabled={isConnecting}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1F2BFF] hover:bg-[#1A22CC] text-white font-bold text-xs shadow-md shadow-[#1F2BFF]/20 hover:shadow-lg hover:shadow-[#1F2BFF]/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
        >
          <Wallet className={`w-3.5 h-3.5 ${isConnecting ? 'animate-bounce' : ''}`} />
          <span>{isConnecting ? 'Connecting to Preprod...' : 'Connect Lace Wallet'}</span>
        </button>
      )}
    </div>
  );
};
