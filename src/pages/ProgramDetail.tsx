import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_PROGRAMS, MOCK_TRANSACTIONS, ScholarshipProgram } from '../data/mockData';
import { formatINR, formatNumberIN } from '../utils/format';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { TxTable } from '../components/sections/TxTable';
import { ApplyProgramModal } from '../components/modals/ApplyProgramModal';
import { 
  ArrowLeft, 
  Coins, 
  Users, 
  Calendar, 
  CheckCircle2, 
  ShieldCheck, 
  Store, 
  Lock, 
  Share2, 
  ExternalLink 
} from 'lucide-react';

export const ProgramDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const program = MOCK_PROGRAMS.find((p) => p.id === id) || MOCK_PROGRAMS[0];

  const programTxs = MOCK_TRANSACTIONS.filter((t) => t.programId === program.id);

  const percentDistributed = Math.min(
    Math.round((program.disbursedAmount / program.totalPool) * 100),
    100
  );

  return (
    <div className="min-h-screen bg-[#F5F7FF] pb-24 transition-colors">
      {/* Top Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/programs"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#1F2BFF] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Programs</span>
          </Link>
        </div>
      </div>

      {/* Program Banner */}
      <div className="bg-[#1F2BFF] text-white py-12 border-b-4 border-[#14F5B0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl shadow-md">
                {program.sponsorLogo}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="mint">{program.sponsorType}</Badge>
                  <Badge variant="navy">Status: {program.status}</Badge>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-sans">
                  {program.name}
                </h1>
                <p className="text-xs sm:text-sm text-white/80 mt-1">
                  Endowed by <strong>{program.sponsor}</strong> • Verified On-Chain
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="mint"
                size="lg"
                onClick={() => setIsApplyModalOpen(true)}
              >
                Apply for this Grant
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Details Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Metric Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-[20px] bg-white border border-slate-200 shadow-soft">
            <span className="text-xs text-slate-500 font-semibold block mb-1">Total Grant Pool</span>
            <div className="text-2xl font-display uppercase tracking-wide text-[#0B1240]">
              {formatINR(program.totalPool)}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">{percentDistributed}% already disbursed</div>
          </div>

          <div className="p-5 rounded-[20px] bg-white border border-slate-200 shadow-soft">
            <span className="text-xs text-slate-500 font-semibold block mb-1">Amount Per Scholar</span>
            <div className="text-2xl font-display uppercase tracking-wide text-[#1F2BFF]">
              {formatINR(program.tokenPerStudent)}
            </div>
            <div className="text-[11px] text-slate-400">Pegged 1:1 in INR tokens</div>
          </div>

          <div className="p-5 rounded-[20px] bg-white border border-slate-200 shadow-soft">
            <span className="text-xs text-slate-500 font-semibold block mb-1">Scholars Funded</span>
            <div className="text-2xl font-display uppercase tracking-wide text-[#00A651]">
              {formatNumberIN(program.studentsFunded)} Students
            </div>
            <div className="text-[11px] text-slate-400">Target: 500 Scholars</div>
          </div>

          <div className="p-5 rounded-[20px] bg-white border border-slate-200 shadow-soft">
            <span className="text-xs text-slate-500 font-semibold block mb-1">Application Deadline</span>
            <div className="text-2xl font-display uppercase tracking-wide text-amber-600">
              {program.deadline}
            </div>
            <div className="text-[11px] text-slate-400">Rolling zero-knowledge review</div>
          </div>
        </div>

        {/* Two Column Layout: Description & Policy */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (2 Cols): Overview & Eligibility */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview */}
            <div className="bg-white rounded-[24px] border border-slate-200 p-6 sm:p-8 shadow-soft space-y-4">
              <h3 className="text-xl font-bold font-sans text-[#0B1240]">
                Program Mission & Scope
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {program.description}
              </p>
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 text-xs text-blue-900 leading-relaxed">
                <strong>How the funds are used:</strong> {program.howFundsAreUsed}
              </div>
            </div>

            {/* Eligibility Criteria */}
            <div className="bg-white rounded-[24px] border border-slate-200 p-6 sm:p-8 shadow-soft space-y-4">
              <h3 className="text-xl font-bold font-sans text-[#0B1240]">
                Academic & Financial Eligibility
              </h3>
              <ul className="space-y-3">
                {program.eligibility.map((crit, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-[#00A651] shrink-0 mt-0.5" />
                    <span>{crit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Institutions Covered */}
            <div className="bg-white rounded-[24px] border border-slate-200 p-6 sm:p-8 shadow-soft space-y-4">
              <h3 className="text-xl font-bold font-sans text-[#0B1240]">
                Key Participating Institutions
              </h3>
              <div className="flex flex-wrap gap-2">
                {program.collegesCovered.map((col, i) => (
                  <span
                    key={i}
                    className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    🏛️ {col}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Allowed Merchants & Smart Contract details */}
          <div className="space-y-6">
            <div className="bg-white rounded-[24px] border-2 border-[#0B1240] p-6 shadow-neo space-y-4">
              <div className="flex items-center gap-2">
                <Store className="w-5 h-5 text-[#1F2BFF]" />
                <h4 className="text-base font-bold text-[#0B1240]">
                  Approved Spending Categories
                </h4>
              </div>
              <p className="text-xs text-slate-600">
                Grant tokens minted for this program can ONLY be transferred to merchants whitelisted in these categories:
              </p>
              <div className="space-y-2">
                {program.allowedCategories.map((cat, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-[#0B1240]"
                  >
                    <span>{cat}</span>
                    <span className="text-[#00A651] font-bold">Approved ✓</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  onClick={() => setIsApplyModalOpen(true)}
                >
                  Apply Now
                </Button>
              </div>
            </div>

            {/* On-Chain Contract Vault Info */}
            <div className="bg-[#0B1240] rounded-[24px] p-6 text-white space-y-3 border border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#14F5B0] font-mono">Smart Contract Vault</span>
                <span className="w-2 h-2 rounded-full bg-[#14F5B0] animate-pulse" />
              </div>
              <div className="font-mono text-xs text-slate-300 break-all bg-white/10 p-3 rounded-xl">
                {program.contractAddress}
              </div>
              <div className="text-[11px] text-slate-400">
                Immutable rules deployed on-chain. Zero administrative fees deducted.
              </div>
            </div>
          </div>
        </div>

        {/* Live Transactions for this program */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold font-sans text-[#0B1240]">
                Live On-Chain Activity for this Program
              </h3>
              <p className="text-xs text-slate-500">
                Verifiable transactions executed by verified scholars under this grant pool
              </p>
            </div>
          </div>

          <TxTable transactions={programTxs.length > 0 ? programTxs : MOCK_TRANSACTIONS.slice(0, 5)} maxRows={8} />
        </div>
      </div>

      <ApplyProgramModal
        program={program}
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />
    </div>
  );
};
