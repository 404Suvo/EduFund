import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ScholarshipProgram } from '../../data/mockData';
import { formatINR, formatNumberIN } from '../../utils/format';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { 
  ArrowUpRight, 
  Coins, 
  Users, 
  Share2, 
  Info, 
  Check, 
  Building2 
} from 'lucide-react';
import { Modal } from '../common/Modal';

interface ProgramCardProps {
  program: ScholarshipProgram;
  onApply?: (program: ScholarshipProgram) => void;
}

export const ProgramCard: React.FC<ProgramCardProps> = ({
  program,
  onApply,
}) => {
  const [showFundModal, setShowFundModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const percentDistributed = Math.min(
    Math.round((program.disbursedAmount / program.totalPool) * 100),
    100
  );

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(window.location.origin + `/programs/${program.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="group relative bg-white rounded-[24px] border border-slate-200/90 shadow-soft hover:shadow-soft-lg hover:border-[#1F2BFF]/30 transition-all duration-300 flex flex-col justify-between p-6 sm:p-7 select-none">
        <div>
          {/* Header Row: Sponsor Logo & Share + Status */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F5F7FF] border border-slate-200 flex items-center justify-center text-2xl shadow-sm group-hover:scale-105 transition-transform">
                {program.sponsorLogo}
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 block">
                  {program.sponsor}
                </span>
                <span className="text-[11px] font-bold text-[#1F2BFF]">
                  {program.sponsorType}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <Badge
                variant={program.status === 'Active' ? 'green' : 'amber'}
              >
                {program.status}
              </Badge>
              <button
                onClick={handleShare}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#1F2BFF] hover:text-white text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
                title="Share link"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Program Name */}
          <Link to={`/programs/${program.id}`}>
            <h3 className="text-lg sm:text-xl font-bold text-[#0B1240] group-hover:text-[#1F2BFF] transition-colors line-clamp-1 mb-2">
              {program.name}
            </h3>
          </Link>

          {/* 3-4 Line Description */}
          <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
            {program.description}
          </p>

          {/* Underlined link: How the funds are used */}
          <button
            type="button"
            onClick={() => setShowFundModal(true)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#1F2BFF] hover:text-[#161EC7] underline underline-offset-4 mb-5 cursor-pointer"
          >
            <Info className="w-3.5 h-3.5" />
            <span>How the funds are used</span>
          </button>
        </div>

        {/* Bottom Section */}
        <div>
          {/* Progress Bar & Amounts */}
          <div className="space-y-2 pt-3 border-t border-slate-100 mb-5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 text-slate-600 font-medium">
                <Coins className="w-4 h-4 text-[#FFB300]" />
                <span>Pool: <strong className="text-[#0B1240] font-sans font-bold">{formatINR(program.totalPool)}</strong></span>
              </div>
              <div className="flex items-center gap-1 text-slate-600 font-medium">
                <Users className="w-4 h-4 text-[#14F5B0]" />
                <span><strong className="text-[#0B1240]">{formatNumberIN(program.studentsFunded)}</strong> scholars</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#1F2BFF] to-[#14F5B0] h-2 rounded-full transition-all duration-500"
                style={{ width: `${percentDistributed}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span>{percentDistributed}% Disbursed</span>
              <span>Grant: <strong>{formatINR(program.tokenPerStudent)}</strong></span>
            </div>
          </div>

          {/* Full-width Blue Button with Arrow Up-Right */}
          <div className="flex gap-2">
            <Button
              variant="primary"
              size="md"
              className="flex-1 justify-between px-5 font-bold"
              iconRight={<ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />}
              onClick={() => onApply ? onApply(program) : (window.location.href = `/programs/${program.id}`)}
            >
              <span>Apply Now</span>
            </Button>
            <Link
              to={`/programs/${program.id}`}
              className="px-4 py-2.5 rounded-full border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center justify-center transition-colors"
            >
              Details
            </Link>
          </div>
        </div>
      </div>

      {/* Fund usage modal */}
      <Modal
        isOpen={showFundModal}
        onClose={() => setShowFundModal(false)}
        title="Fund Purpose & Spend Policy"
        subtitle={program.name}
        maxWidth="md"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600 leading-relaxed">
            {program.howFundsAreUsed}
          </p>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Approved Merchant Categories:
            </h5>
            <div className="flex flex-wrap gap-1.5">
              {program.allowedCategories.map((cat, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-[#1F2BFF]/10 text-[#1F2BFF]"
                >
                  ✓ {cat}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
            <strong>Fraud Shield Active:</strong> Tokens from this program cannot be spent at general retail, restaurants, or entertainment portals.
          </div>

          <Button
            variant="primary"
            size="md"
            className="w-full"
            onClick={() => setShowFundModal(false)}
          >
            Understood
          </Button>
        </div>
      </Modal>
    </>
  );
};
