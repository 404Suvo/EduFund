import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { TxTable } from '../components/sections/TxTable';
import { StatCounter } from '../components/common/StatCounter';
import { DeployContractModal } from '../components/modals/DeployContractModal';
import { 
  Compass, 
  Search, 
  ShieldCheck, 
  Layers, 
  Coins, 
  CheckCircle2, 
  Cpu,
  Rocket,
  ExternalLink
} from 'lucide-react';

export const Explorer: React.FC = () => {
  const { transactions } = useWallet();
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || searchParams.get('q') || searchParams.get('tx') || '';
  const initialSelectedTxId = searchParams.get('tx') || undefined;
  const [isDeployModalOpen, setIsDeployModalOpen] = useState<boolean>(false);
  const [contractAddress, setContractAddress] = useState<string>(
    '0xd5ea58d1702899641495e5a879bd1696dadc611fd72c965351b7cabe3af0fbf3'
  );
  return (
    <div className="min-h-screen bg-[#F5F7FF] pb-24 transition-colors">
      {/* Top Banner */}
      <section className="bg-[#0B1240] text-white py-12 border-b-4 border-[#14F5B0] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-[#14F5B0] font-bold">
            <Compass className="w-4 h-4 text-[#14F5B0]" />
            <span>PUBLIC ON-CHAIN EXPLORER</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-wide text-white">
            THE SCHOLARSHIP LEDGER
          </h1>

          <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Every scholarship voucher issued, every merchant POS checkout, and every attempted non-educational transaction is publicly recorded with immutable proofs.
          </p>
        </div>
      </section>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Deployed Contract Status Strip */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#0B1240] shadow-neo flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#1F2BFF] flex items-center justify-center text-white shrink-0 shadow-sm">
              <ShieldCheck className="w-5 h-5 text-[#14F5B0]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#0B1240]">EduFund Compact Smart Contract</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#14F5B0]/20 text-[#008A5E] border border-[#14F5B0]/40 uppercase font-mono">
                  Live on Preprod
                </span>
              </div>
              <div className="text-xs text-slate-500 font-mono mt-0.5 break-all">
                Contract: <span className="font-semibold text-[#0B1240]">{contractAddress}</span>
              </div>
              <div className="text-[11px] text-slate-500 font-mono mt-0.5 flex items-center gap-1.5 flex-wrap">
                <span>Genesis On-Chain Tx:</span>
                <span className="text-[#1F2BFF] font-semibold">0xd5ea58d1702899641495e5a879bd1696dadc611fd72c965351b7cabe3af0fbf3</span>
                <span className="px-1.5 py-0.5 rounded bg-green-100 text-green-700 text-[10px] font-bold">Consensus Finalized</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0 flex-wrap">
            <button
              type="button"
              onClick={() => setIsDeployModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#C8F560] text-[#0B1240] hover:bg-[#b5e742] transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Rocket className="w-3.5 h-3.5 text-[#0B1240]" />
              <span>Deploy Contract</span>
            </button>

            <a
              href={`https://preprod.midnight.network/tx/0xd5ea58d1702899641495e5a879bd1696dadc611fd72c965351b7cabe3af0fbf3`}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#1F2BFF] text-white hover:bg-[#161EC7] transition-colors flex items-center gap-1.5"
            >
              <span>View Genesis Tx</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#14F5B0]" />
            </a>
          </div>
        </div>
        {/* Metric Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-soft flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-50 text-[#1F2BFF]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-semibold block">Total Blocks Processed</span>
              <span className="text-xl font-bold font-mono text-[#0B1240]">4,892,104</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-soft flex items-center gap-3">
            <div className="p-3 rounded-xl bg-green-50 text-[#00A651]">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-semibold block">Verified Spend Rate</span>
              <span className="text-xl font-bold font-mono text-[#00A651]">99.4% On-Chain</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-soft flex items-center gap-3">
            <div className="p-3 rounded-xl bg-amber-50 text-amber-600">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-semibold block">Average Finality</span>
              <span className="text-xl font-bold font-mono text-[#0B1240]">1.8 Seconds</span>
            </div>
          </div>
        </div>

        {/* Searchable Transaction Table with Drawer Trigger */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold font-sans text-[#0B1240]">
              All On-Chain Transactions ({transactions.length})
            </h3>
            <span className="text-xs text-slate-500">
              Click any row to open the complete money journey drawer
            </span>
          </div>

          <TxTable 
            transactions={transactions} 
            showSearch={true} 
            initialSearch={initialSearch}
            initialSelectedTxId={initialSelectedTxId}
          />
        </div>
      </div>

      {/* Deploy Contract Modal */}
      <DeployContractModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
        onContractDeployed={(newAddr) => setContractAddress(newAddr)}
      />
    </div>
  );
};
