import React, { useState } from 'react';
import { 
  Coins, 
  Store, 
  GraduationCap, 
  HeartHandshake, 
  FileCheck2, 
  ShieldCheck, 
  Zap, 
  ScrollText, 
  Award, 
  Briefcase,
  ChevronRight
} from 'lucide-react';

interface TileData {
  id: string;
  label: string;
  tag: string;
  icon: React.ReactNode;
  accent: string;
  glowColor: string;
  description: string;
  metric: string;
  delay: string;
}

const column1: TileData[] = [
  {
    id: 'tokens',
    label: 'Scholarship Tokens',
    tag: 'ERC-20 VOUCHER',
    icon: <Coins className="w-4 h-4 text-[#14F5B0]" />,
    accent: 'border-[#14F5B0]',
    glowColor: 'rgba(20, 245, 176, 0.4)',
    description: 'Purpose-locked digital vouchers restricted strictly to verified education expenses.',
    metric: '₹12.45 Cr Minted',
    delay: '0s',
  },
  {
    id: 'universities',
    label: 'Universities & Colleges',
    tag: 'INSTITUTIONAL',
    icon: <GraduationCap className="w-4 h-4 text-[#6ECFE0]" />,
    accent: 'border-[#6ECFE0]',
    glowColor: 'rgba(110, 207, 224, 0.4)',
    description: 'Registrar API links for real-time enrollment validation and instant KYC verification.',
    metric: '84 Campuses Connected',
    delay: '1.4s',
  },
  {
    id: 'proof',
    label: 'Proof of Spend',
    tag: 'CRYPTOGRAPHIC AUDIT',
    icon: <FileCheck2 className="w-4 h-4 text-[#14F5B0]" />,
    accent: 'border-[#14F5B0]',
    glowColor: 'rgba(20, 245, 176, 0.4)',
    description: 'Merchant POS generates itemized cryptographic receipts proving legitimate student spend.',
    metric: 'Zero Invoice Fraud',
    delay: '0.7s',
  },
  {
    id: 'payout',
    label: 'Instant Payout',
    tag: 'ALGORITHMIC',
    icon: <Zap className="w-4 h-4 text-[#FFB300]" />,
    accent: 'border-[#FFB300]',
    glowColor: 'rgba(255, 179, 0, 0.4)',
    description: 'Grants disburse directly to student wallets in seconds, eliminating clerical bottlenecks.',
    metric: '< 60s Settlement',
    delay: '2.1s',
  },
  {
    id: 'merit',
    label: 'Merit & Need Grants',
    tag: 'AUTOMATED AWARDS',
    icon: <Award className="w-4 h-4 text-[#C8F560]" />,
    accent: 'border-[#C8F560]',
    glowColor: 'rgba(200, 245, 96, 0.4)',
    description: 'Smart contracts release stipend tranches automatically based on semester performance.',
    metric: 'Milestone Triggers',
    delay: '1.0s',
  },
];

const column2: TileData[] = [
  {
    id: 'merchants',
    label: 'Verified Merchants',
    tag: 'APPROVED VENDORS',
    icon: <Store className="w-4 h-4 text-[#FFB300]" />,
    accent: 'border-[#FFB300]',
    glowColor: 'rgba(255, 179, 0, 0.4)',
    description: 'Bookstores, labs, hostel portals, and device stores accredited to redeem vouchers.',
    metric: '438 Active Stores',
    delay: '0.4s',
  },
  {
    id: 'donors',
    label: 'Donors & CSR Portal',
    tag: 'CORPORATE SPONSORS',
    icon: <HeartHandshake className="w-4 h-4 text-[#C8F560]" />,
    accent: 'border-[#C8F560]',
    glowColor: 'rgba(200, 245, 96, 0.4)',
    description: 'Real-time transparent dashboards for sponsors to trace every single rupee spent.',
    metric: '14,820 Scholars Funded',
    delay: '1.8s',
  },
  {
    id: 'shield',
    label: 'Fraud Shield',
    tag: 'ZERO CASH LEAKAGE',
    icon: <ShieldCheck className="w-4 h-4 text-[#F0552B]" />,
    accent: 'border-[#F0552B]',
    glowColor: 'rgba(240, 85, 43, 0.4)',
    description: 'Non-fungible utility limits tokens to education; impossible to cash out or divert.',
    metric: '0% Fund Diversion',
    delay: '0.9s',
  },
  {
    id: 'trail',
    label: 'Immutable Audit Trail',
    tag: 'PUBLIC EXPLORER',
    icon: <ScrollText className="w-4 h-4 text-[#6ECFE0]" />,
    accent: 'border-[#6ECFE0]',
    glowColor: 'rgba(110, 207, 224, 0.4)',
    description: 'Every token minted, transferred, and redeemed is permanently verifiable on-chain.',
    metric: '68,912 Verified Txns',
    delay: '2.5s',
  },
  {
    id: 'csr',
    label: 'CSR Compliance Engine',
    tag: 'TAX COMPLIANT',
    icon: <Briefcase className="w-4 h-4 text-[#14F5B0]" />,
    accent: 'border-[#14F5B0]',
    glowColor: 'rgba(20, 245, 176, 0.4)',
    description: 'Automated Section 135 reporting and certification for institutional CSR audits.',
    metric: 'Govt Compliant Audit',
    delay: '1.3s',
  },
];

export const HeroTiles: React.FC = () => {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const renderCard = (tile: TileData) => {
    const isHovered = hoveredCardId === tile.id;
    const isAnyHovered = hoveredCardId !== null;

    return (
      <div
        key={tile.id}
        onMouseEnter={() => setHoveredCardId(tile.id)}
        onMouseLeave={() => setHoveredCardId(null)}
        className="relative transition-all duration-300 ease-out cursor-pointer"
        style={{
          zIndex: isHovered ? 40 : 10,
          animation: isAnyHovered ? 'none' : `float 5s ease-in-out infinite ${tile.delay}`,
        }}
      >
        <div
          className={`w-full rounded-[18px] bg-[#0B1240]/95 border-2 ${tile.accent} backdrop-blur-md transition-all duration-300 flex flex-col justify-between overflow-hidden ${
            isHovered 
              ? 'scale-[1.04] -translate-y-1 bg-[#0E174D]' 
              : isAnyHovered 
                ? 'opacity-65 scale-[0.98]' 
                : 'opacity-100 shadow-md'
          }`}
          style={{
            boxShadow: isHovered 
              ? `0 16px 36px -8px rgba(0, 0, 0, 0.6), 0 0 24px ${tile.glowColor}` 
              : '0 8px 20px -4px rgba(11, 18, 64, 0.4)',
            minHeight: isHovered ? '146px' : '76px',
            padding: isHovered ? '14px 16px' : '10px 14px',
          }}
        >
          {/* Header Row: Icon + Badge / Status */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-white/10 shrink-0 flex items-center justify-center">
                {tile.icon}
              </div>
              <span className="text-[10px] font-mono tracking-wider font-bold text-slate-300 uppercase">
                {tile.tag}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[10px] text-slate-300 font-mono shrink-0">
              <span className={`w-1.5 h-1.5 rounded-full ${isHovered ? 'bg-[#14F5B0] animate-ping' : 'bg-[#14F5B0] animate-pulse'}`} />
              <span className={isHovered ? 'text-[#14F5B0] font-bold' : ''}>
                {isHovered ? 'ACTIVE' : 'On-Chain'}
              </span>
            </div>
          </div>

          {/* Title */}
          <div className="font-sans font-bold text-xs sm:text-[13px] tracking-wide text-white leading-tight mt-1.5">
            {tile.label}
          </div>

          {/* Expanded content visible on hover */}
          {isHovered && (
            <div className="pt-2 mt-1.5 border-t border-white/10 animate-in fade-in duration-200 space-y-2">
              <p className="text-[11px] text-slate-200 leading-relaxed font-normal">
                {tile.description}
              </p>
              <div className="flex items-center justify-between pt-0.5">
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-white/10 text-[#14F5B0] border border-white/10">
                  {tile.metric}
                </span>
                <span className="text-[10px] text-white/60 flex items-center gap-0.5 font-medium">
                  Verified <ChevronRight className="w-3 h-3 text-[#14F5B0]" />
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-[480px] mx-auto select-none">
      {/* Interactive Micro-Header Hint */}
      <div className="flex items-center justify-between px-1 mb-2.5 text-[11px] font-mono text-white/70">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#14F5B0] animate-pulse" />
          <span className="tracking-wider uppercase font-semibold">Live Protocol Architecture</span>
        </div>
        <span className="text-[#14F5B0] text-[10px] font-semibold bg-[#14F5B0]/10 px-2 py-0.5 rounded-full border border-[#14F5B0]/20">
          Hover to inspect card
        </span>
      </div>

      {/* 2-Column Staggered Interactive Grid */}
      <div className="grid grid-cols-2 gap-3 items-start">
        {/* Column 1 */}
        <div className="flex flex-col gap-2.5">
          {column1.map(renderCard)}
        </div>

        {/* Column 2 (staggered slightly for natural organic rhythm) */}
        <div className="flex flex-col gap-2.5 pt-3">
          {column2.map(renderCard)}
        </div>
      </div>
    </div>
  );
};
