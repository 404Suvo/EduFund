import React from 'react';
import { 
  Building, 
  Landmark, 
  School, 
  GraduationCap, 
  User, 
  Coins, 
  Store, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  EyeOff, 
  FileWarning, 
  ShieldCheck, 
  Zap, 
  Lock, 
  Eye 
} from 'lucide-react';

export const FlowDiagram: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* LEFT: The Old Way (Bureaucratic friction) */}
      <div className="bg-white rounded-[28px] border-2 border-slate-200 p-6 sm:p-8 shadow-soft flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-100 px-3 py-1 rounded-full">
              The Broken Bureaucracy
            </span>
            <span className="text-xs font-semibold text-slate-500">
              Avg. Time: 45–90 Days
            </span>
          </div>

          <h3 className="text-2xl font-bold font-sans text-[#0B1240] mb-2">
            The Traditional Pipeline
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
            Scholarship capital trickles through multiple fragmented layers before reaching the student. Resulting in rampant paperwork bottlenecks, zero donor visibility, and cash misdirection.
          </p>

          {/* Vertical Flow */}
          <div className="space-y-3 relative mb-6">
            <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-red-200 border-l border-dashed border-red-300 pointer-events-none" />

            <div className="relative flex items-center gap-3 p-3 rounded-2xl bg-red-50/60 border border-red-100">
              <div className="w-9 h-9 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold z-10 shrink-0">
                <Landmark className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-slate-800">1. Government / Corporate Donor</div>
                <div className="text-[11px] text-slate-500">Transfers fiat funds to state nodal account</div>
              </div>
            </div>

            <div className="relative flex items-center gap-3 p-3 rounded-2xl bg-red-50/60 border border-red-100">
              <div className="w-9 h-9 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold z-10 shrink-0">
                <Building className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-slate-800">2. Education Ministry Directorate</div>
                <div className="text-[11px] text-slate-500">Manual verification of paper physical ledgers (3–4 weeks delay)</div>
              </div>
            </div>

            <div className="relative flex items-center gap-3 p-3 rounded-2xl bg-red-50/60 border border-red-100">
              <div className="w-9 h-9 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold z-10 shrink-0">
                <School className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-slate-800">3. University Head Administration</div>
                <div className="text-[11px] text-slate-500">Batched bank reconciliation across hundreds of affiliated colleges</div>
              </div>
            </div>

            <div className="relative flex items-center gap-3 p-3 rounded-2xl bg-red-50/60 border border-red-100">
              <div className="w-9 h-9 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold z-10 shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-slate-800">4. College Treasury & Clerk Counter</div>
                <div className="text-[11px] text-slate-500">Endless stamp queues, lost certificates, and duplicate claims</div>
              </div>
            </div>

            <div className="relative flex items-center gap-3 p-3 rounded-2xl bg-red-100/80 border border-red-200">
              <div className="w-9 h-9 rounded-xl bg-red-200 text-red-800 flex items-center justify-center font-bold z-10 shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-slate-900">5. Student Receives Cash Deposit</div>
                <div className="text-[11px] text-red-700 font-semibold">Unrestricted cash: Zero proof money was spent on books or fees</div>
              </div>
            </div>
          </div>
        </div>

        {/* Warning Callouts */}
        <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-1.5 text-red-700">
            <Clock className="w-4 h-4 shrink-0" />
            <span>Extremely Slow & Tedious</span>
          </div>
          <div className="flex items-center gap-1.5 text-red-700">
            <EyeOff className="w-4 h-4 shrink-0" />
            <span>Zero Donor Visibility</span>
          </div>
          <div className="flex items-center gap-1.5 text-red-700">
            <FileWarning className="w-4 h-4 shrink-0" />
            <span>Paperwork & Duplicate Claims</span>
          </div>
          <div className="flex items-center gap-1.5 text-red-700">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Frequent Fund Leakage</span>
          </div>
        </div>
      </div>

      {/* RIGHT: The EduFund Way (Instant on-chain settlement) */}
      <div className="bg-[#0B1240] rounded-[28px] border-2 border-[#14F5B0] p-6 sm:p-8 text-white shadow-2xl flex flex-col justify-between relative overflow-hidden">
        {/* Glow circle */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#1F2BFF]/30 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B1240] bg-[#14F5B0] px-3 py-1 rounded-full shadow-glow-mint">
              The EduFund Direct Protocol
            </span>
            <span className="text-xs font-semibold text-[#14F5B0] font-mono">
              Payout: &lt; 60 Seconds
            </span>
          </div>

          <h3 className="text-2xl font-bold font-sans text-white mb-2">
            The Purpose-Bound Flow
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
            Eliminates multi-tier middle management. Donors deposit funds directly into smart contract pools, issuing purpose-locked cryptographic tokens students can only spend at approved educational merchants.
          </p>

          {/* Short Glowing Flow */}
          <div className="space-y-3 relative mb-6">
            <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-[#14F5B0]/50 pointer-events-none" />

            <div className="relative flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-[#14F5B0] transition-colors">
              <div className="w-9 h-9 rounded-xl bg-[#1F2BFF] text-white flex items-center justify-center font-bold z-10 shrink-0 shadow-md">
                <Landmark className="w-5 h-5 text-[#14F5B0]" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-white">1. Donor / Government</div>
                <div className="text-[11px] text-slate-300">Deposits scholarship capital into immutable smart contract vault</div>
              </div>
            </div>

            <div className="relative flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-[#14F5B0]/30 shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-[#14F5B0] text-[#0B1240] flex items-center justify-center font-bold z-10 shrink-0">
                <Coins className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-[#14F5B0]">2. EduFund Mints Purpose Tokens</div>
                <div className="text-[11px] text-slate-300">Rules encoded on-chain: valid only for books, tuition, hostels & labs</div>
              </div>
            </div>

            <div className="relative flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-9 h-9 rounded-xl bg-[#6ECFE0] text-[#0B1240] flex items-center justify-center font-bold z-10 shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-white">3. Students Receive Tokens Directly</div>
                <div className="text-[11px] text-slate-300">Zero-knowledge proof confirms merit & enrollment instantly</div>
              </div>
            </div>

            <div className="relative flex items-center gap-3 p-3 rounded-2xl bg-[#14F5B0]/10 border border-[#14F5B0]">
              <div className="w-9 h-9 rounded-xl bg-[#C8F560] text-[#0B1240] flex items-center justify-center font-bold z-10 shrink-0">
                <Store className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-[#C8F560]">4. Spent ONLY at Approved Merchants</div>
                <div className="text-[11px] text-white">Bookstores, tuition centres, and college fee counters. Zero non-edu leakage!</div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-2 gap-2 pt-4 border-t border-white/10 text-xs text-[#14F5B0] font-semibold relative z-10">
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-[#14F5B0] shrink-0" />
            <span>Instant & Automated</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-[#14F5B0] shrink-0" />
            <span>100% On-Chain Visibility</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#14F5B0] shrink-0" />
            <span>Zero Fraud & Zero Duplicate Claims</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-[#14F5B0] shrink-0" />
            <span>Guaranteed Education Spend</span>
          </div>
        </div>
      </div>
    </div>
  );
};
