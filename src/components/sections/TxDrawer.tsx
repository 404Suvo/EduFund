import React, { useState } from 'react';
import { Transaction } from '../../data/mockData';
import { formatINR, formatDate, truncateHash, copyToClipboard } from '../../utils/format';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { 
  X, 
  Copy, 
  Check, 
  ShieldCheck, 
  AlertTriangle, 
  ExternalLink, 
  ArrowRight, 
  Coins, 
  Store, 
  User, 
  FileCheck 
} from 'lucide-react';

interface TxDrawerProps {
  tx: Transaction | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TxDrawer: React.FC<TxDrawerProps> = ({
  tx,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !tx) return null;

  const handleCopy = () => {
    copyToClipboard(tx.hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isBlocked = tx.status === 'Blocked Non-Education Tx';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0B1240]/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md sm:max-w-lg bg-white border-l-2 border-[#0B1240] shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
          <div>
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge
                    variant={isBlocked ? 'red' : tx.status === 'Verified On-Chain' ? 'mint' : 'blue'}
                  >
                    {tx.status}
                  </Badge>
                  <span className="text-xs text-slate-500 font-mono">Block #{tx.blockNumber}</span>
                </div>
                <h3 className="text-xl font-bold font-sans text-[#0B1240]">
                  On-Chain Money Journey
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-[#0B1240] transition-colors"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Amount Banner */}
            <div className={`my-5 p-5 rounded-2xl ${isBlocked ? 'bg-red-50 border border-red-200' : 'bg-blue-50 border border-blue-200'}`}>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Transaction Value
              </div>
              <div className={`text-3xl font-display font-bold ${isBlocked ? 'text-red-700' : 'text-[#1F2BFF]'}`}>
                {formatINR(tx.amount)}
              </div>
              <div className="text-xs text-slate-600 mt-1">
                Category: <strong>{tx.category}</strong>
              </div>
            </div>

            {/* ID & Hash copy strip */}
            <div className="mb-6 space-y-2">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between font-mono text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold">TRANSACTION ID:</span>
                  <span className="font-bold text-[#1F2BFF]">{tx.id.toUpperCase()}</span>
                </div>
                <button
                  onClick={() => {
                    copyToClipboard(tx.id);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 transition-colors ml-2 shrink-0 cursor-pointer flex items-center gap-1 text-[11px] font-sans font-semibold text-slate-700"
                  title="Copy Tx ID"
                >
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy ID</span>
                </button>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between font-mono text-xs">
                <div className="min-w-0 pr-2">
                  <span className="text-slate-400 block text-[10px] font-bold">TRANSACTION HASH:</span>
                  <span className="font-semibold text-[#0B1240] break-all">{tx.hash}</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 transition-colors shrink-0 cursor-pointer flex items-center gap-1 text-[11px] font-sans font-semibold text-slate-700"
                  title="Copy full hash"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Visual Step Timeline: Money Journey */}
            <div className="space-y-4 mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Lifecycle Step Journey:
              </h4>

              <div className="space-y-4 relative pl-6 border-l-2 border-[#1F2BFF]/30 ml-2">
                {/* Step 1 */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-0 w-6 h-6 rounded-full bg-[#1F2BFF] text-white flex items-center justify-center text-[10px] font-bold">
                    1
                  </div>
                  <div className="text-xs font-bold text-[#0B1240]">Donor / Program Pool Vault</div>
                  <div className="text-[11px] text-slate-500">Funds committed under strict scholarship covenants</div>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-0 w-6 h-6 rounded-full bg-[#1F2BFF] text-white flex items-center justify-center text-[10px] font-bold">
                    2
                  </div>
                  <div className="text-xs font-bold text-[#0B1240]">Issued to: {tx.fromName}</div>
                  <div className="text-[11px] text-slate-500 font-mono">Wallet: {tx.fromAddress}</div>
                </div>

                {/* Step 3 */}
                <div className="relative">
                  <div className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${isBlocked ? 'bg-red-600 text-white' : 'bg-[#14F5B0] text-[#0B1240]'}`}>
                    3
                  </div>
                  <div className="text-xs font-bold text-[#0B1240]">
                    {isBlocked ? 'Smart Shield Enforcement' : `Redemption at: ${tx.toName}`}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {isBlocked ? tx.blockReason : `Merchant Node: ${tx.toAddress}`}
                  </div>
                </div>

                {/* Step 4 */}
                <div className="relative">
                  <div className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${isBlocked ? 'bg-slate-300 text-slate-600' : 'bg-[#00A651] text-white'}`}>
                    4
                  </div>
                  <div className="text-xs font-bold text-[#0B1240]">
                    {isBlocked ? 'Zero Fund Leakage: Disallowed' : 'Final Audit Settlement & Receipt'}
                  </div>
                  <div className="text-[11px] text-slate-500">{formatDate(tx.timestamp)}</div>
                </div>
              </div>
            </div>

            {/* Purpose & Note */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1 mb-6">
              <span className="font-bold text-[#0B1240] block">Purpose of Expenditure:</span>
              <p className="text-slate-600 leading-relaxed">{tx.purpose}</p>
            </div>
          </div>

          {/* Footer Action */}
          <div className="pt-4 border-t border-slate-100 flex gap-2">
            <Button
              variant="outline"
              size="md"
              className="flex-1"
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              variant="primary"
              size="md"
              className="flex-1"
              iconRight={<ExternalLink className="w-4 h-4" />}
              onClick={() => {
                alert(`On-chain state confirmed on block #${tx.blockNumber}. Hash verified.`);
              }}
            >
              Verify On-Chain
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
