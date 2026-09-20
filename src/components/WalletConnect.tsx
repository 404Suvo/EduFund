import React from 'react';
import { Wallet, CheckCircle, AlertCircle, ExternalLink, RefreshCw } from 'lucide-react';
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
        <div className="hidden lg:flex items-center gap-1 text-xs text-rose-400 bg-rose-950/40 border border-rose-800/50 px-3 py-1.5 rounded-lg">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{error}</span>
        </div>
      )}

      {isConnected ? (
        <div className="flex items-center gap-2">
          {/* Network Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Midnight {networkId.toUpperCase()}</span>
          </div>

          {/* Balance Pill */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-midnight-800/80 border border-slate-700/60 text-slate-200 text-xs">
            <span className="text-slate-400">Balance:</span>
            <span className="font-semibold text-cyan-400">{formattedBalance} tNIGHT</span>
          </div>

          {/* Account & Disconnect Button */}
          <button
            onClick={disconnect}
            title="Click to disconnect"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-midnight-700/80 hover:bg-rose-950/40 hover:border-rose-500/50 border border-slate-600/50 text-slate-200 text-xs font-mono transition-all group"
          >
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400 group-hover:hidden" />
            <RefreshCw className="w-3.5 h-3.5 text-rose-400 hidden group-hover:inline animate-spin" />
            <span className="group-hover:text-rose-300">{formattedAddress}</span>
          </button>
        </div>
      ) : (
        <button
          onClick={connect}
          disabled={isConnecting}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-xs shadow-lg shadow-cyan-500/20 transition-all transform active:scale-95 disabled:opacity-50"
        >
          <Wallet className={`w-3.5 h-3.5 ${isConnecting ? 'animate-bounce' : ''}`} />
          <span>{isConnecting ? 'Connecting to Preprod...' : 'Connect Lace Wallet'}</span>
        </button>
      )}
    </div>
  );
};
