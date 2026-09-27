import React from 'react';
import { StudentProfile } from '../../data/mockData';
import { formatINR } from '../../utils/format';
import { Button } from '../common/Button';
import { 
  Coins, 
  QrCode, 
  ShieldCheck, 
  Lock, 
  Unlock, 
  AlertOctagon, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

interface TokenWalletCardProps {
  student: StudentProfile;
  onOpenPayModal: () => void;
  onTriggerBlockedDemo: () => void;
}

export const TokenWalletCard: React.FC<TokenWalletCardProps> = ({
  student,
  onOpenPayModal,
  onTriggerBlockedDemo,
}) => {
  const steps = [
    { num: 1, label: 'Applied' },
    { num: 2, label: 'Verified' },
    { num: 3, label: 'Tokens Issued' },
    { num: 4, label: 'Spending' },
  ];

  return (
    <div className="space-y-6">
      {/* Main Royal Blue Wallet Card */}
      <div className="relative rounded-[28px] bg-gradient-to-br from-[#1F2BFF] to-[#121AB0] p-6 sm:p-8 text-white shadow-xl overflow-hidden border-2 border-[#14F5B0]/30">
        {/* Background circuit pattern */}
        <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-white/5 blur-2xl pointer-events-none" />
        <div className="absolute right-6 bottom-6 opacity-10 pointer-events-none">
          <Coins className="w-48 h-48 text-[#14F5B0]" />
        </div>

        <div className="relative z-10">
          {/* Top Info */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-white/15 text-[#14F5B0] border border-[#14F5B0]/30">
                  {student.anonymizedId}
                </span>
                <span className="text-xs text-white/80 font-medium">
                  {student.college}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-sans mt-1">
                {student.name}’s Student Wallet
              </h2>
            </div>

            <div className="text-right">
              <span className="text-[11px] uppercase tracking-wider text-[#14F5B0] font-bold block">
                Pegged 1:1 with INR
              </span>
              <span className="text-xs text-white/70">Program: {student.programName}</span>
            </div>
          </div>

          {/* Balance Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-[#0B1240]/60 backdrop-blur-md border border-white/10 mb-6">
            <div>
              <span className="text-xs text-slate-300 block mb-1">Available Token Balance</span>
              <div className="text-3xl sm:text-4xl font-display uppercase tracking-wide text-[#14F5B0]">
                {formatINR(student.remainingTokens)}
              </div>
              <span className="text-[11px] text-slate-300">Ready to spend at campus merchants</span>
            </div>

            <div>
              <span className="text-xs text-slate-300 block mb-1">Total Grant Allotted</span>
              <div className="text-2xl font-display uppercase tracking-wide text-white">
                {formatINR(student.totalGrant)}
              </div>
              <span className="text-[11px] text-slate-300">100% Sponsor Covered</span>
            </div>

            <div>
              <span className="text-xs text-slate-300 block mb-1">Total Verified Spent</span>
              <div className="text-2xl font-display uppercase tracking-wide text-[#C8F560]">
                {formatINR(student.spentAmount)}
              </div>
              <span className="text-[11px] text-slate-300">{student.recentTxCount} receipts on-chain</span>
            </div>
          </div>

          {/* Stepper (Applied -> Verified -> Tokens Issued -> Spending) */}
          <div className="mb-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 block mb-3">
              Scholarship Grant Lifecycle Status:
            </span>
            <div className="grid grid-cols-4 gap-2">
              {steps.map((st) => {
                const isDone = student.stepperStage >= st.num;
                const isCurrent = student.stepperStage === st.num;
                return (
                  <div key={st.num} className="flex flex-col items-center text-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-1 transition-all ${
                        isDone
                          ? 'bg-[#14F5B0] text-[#0B1240] shadow-glow-mint'
                          : 'bg-white/20 text-white/60'
                      }`}
                    >
                      {isDone ? <CheckCircle2 className="w-5 h-5" /> : st.num}
                    </div>
                    <span
                      className={`text-[11px] font-semibold ${
                        isCurrent
                          ? 'text-[#14F5B0] font-bold'
                          : isDone
                          ? 'text-white'
                          : 'text-white/50'
                      }`}
                    >
                      {st.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button
              variant="mint"
              size="lg"
              className="flex-1 min-w-[200px]"
              icon={<QrCode className="w-5 h-5" />}
              onClick={onOpenPayModal}
            >
              Pay at Approved Merchant (Scan QR)
            </Button>
            <Button
              variant="outline-white"
              size="lg"
              className="text-xs"
              onClick={onTriggerBlockedDemo}
            >
              Try Non-Education Spend (Demo Block)
            </Button>
          </div>
        </div>
      </div>

      {/* Purpose-Locked Token Buckets Grid */}
      <div className="bg-white rounded-[24px] border border-slate-200 p-6 sm:p-7 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-[#0B1240]">
              Purpose-Bound Token Buckets
            </h3>
            <p className="text-xs text-slate-500">
              Funds are restricted by smart contracts to specific authorized categories
            </p>
          </div>
          <div className="flex items-center gap-1 text-xs text-[#00A651] font-bold bg-[#00A651]/10 px-3 py-1 rounded-full">
            <ShieldCheck className="w-4 h-4" />
            <span>Policy Enforced</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {student.buckets.map((b, i) => {
            const pct = Math.round((b.spent / b.allocated) * 100);
            return (
              <div
                key={i}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-white border border-slate-200 text-[#1F2BFF]">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0B1240]">{b.category}</h4>
                      <span className="text-[11px] text-slate-500">{b.note}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-[#0B1240] block font-sans">
                      {formatINR(b.remaining)}
                    </span>
                    <span className="text-[10px] text-slate-400">of {formatINR(b.allocated)} left</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-[#1F2BFF] h-1.5 rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Friendly Blocked Transaction Notification Banner */}
      <div className="rounded-[22px] bg-[#FDF0E1] border-2 border-[#0B1240] shadow-neo p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-[#F0552B] text-white shrink-0 mt-0.5">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-[#0B1240] flex items-center gap-2">
              <span>Security Shield Demo: Non-Education Transaction Blocked</span>
              <span className="text-[10px] px-2 py-0.5 bg-red-100 text-red-700 font-bold rounded-full">
                Rejected by Contract
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl">
              Attempted: <strong>Café Java Bistro (₹320)</strong>. Because EduFund tokens are purpose-bound digital assets, transactions at unauthorized food/cinema outlets are automatically stopped with 0 penalty.
            </p>
          </div>
        </div>

        <button
          onClick={onTriggerBlockedDemo}
          className="text-xs font-bold text-[#1F2BFF] hover:underline shrink-0 cursor-pointer"
        >
          View Block Proof →
        </button>
      </div>
    </div>
  );
};
