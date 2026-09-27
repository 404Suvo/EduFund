import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MOCK_PROGRAMS, 
  PLATFORM_STATS, 
  TRUST_FEATURES, 
  FAQ_ITEMS, 
  ScholarshipProgram 
} from '../data/mockData';
import { formatINR } from '../utils/format';
import { HeroTiles } from '../components/common/HeroTiles';
import { FloatingOrbs } from '../components/common/FloatingOrbs';
import { StatCounter } from '../components/common/StatCounter';
import { Button } from '../components/common/Button';
import { ProgramCard } from '../components/cards/ProgramCard';
import { FlowDiagram } from '../components/sections/FlowDiagram';
import { StepTimeline } from '../components/sections/StepTimeline';
import { NeoCard } from '../components/common/NeoCard';
import { Mascot } from '../components/common/Mascot';
import { Accordion } from '../components/common/Accordion';
import { ApplyProgramModal } from '../components/modals/ApplyProgramModal';
import { 
  GraduationCap, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Fingerprint, 
  CheckCircle2, 
  Cpu, 
  FileCheck, 
  ChevronRight 
} from 'lucide-react';

export const Home: React.FC = () => {
  const [selectedProgramForApply, setSelectedProgramForApply] = useState<ScholarshipProgram | null>(null);

  const getTrustIcon = (name: string) => {
    switch (name) {
      case 'Fingerprint': return <Fingerprint className="w-6 h-6 text-[#1F2BFF]" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-6 h-6 text-[#00A651]" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-[#14F5B0]" />;
      case 'FileCheck': return <FileCheck className="w-6 h-6 text-[#FFB300]" />;
      default: return <ShieldCheck className="w-6 h-6 text-[#1F2BFF]" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative bg-isometric-grid pt-12 pb-36 lg:pb-48 text-white overflow-hidden">
        <FloatingOrbs />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-[#14F5B0] animate-pulse" />
                <span className="text-[#14F5B0]">PURPOSE-BOUND SCHOLARSHIP PROTOCOL</span>
              </div>

              {/* Giant Mint Headline */}
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#14F5B0] uppercase leading-[0.95]">
                SCHOLARSHIPS <br className="hidden sm:inline" />
                YOU CAN TRACE.
              </h1>

              {/* White Subheading */}
              <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-xl font-normal leading-relaxed">
                A blockchain platform that turns scholarship money into purpose-locked tokens — spent only on education, verifiable by everyone.
              </p>

              {/* Two CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link to="/programs">
                  <Button
                    variant="mint"
                    size="lg"
                    iconRight={<ArrowRight className="w-5 h-5 text-[#0B1240]" />}
                  >
                    Explore Programs
                  </Button>
                </Link>

                <Link to="/donor">
                  <Button
                    variant="outline-white"
                    size="lg"
                  >
                    Become a Donor
                  </Button>
                </Link>
              </div>

              {/* Trust micro-text */}
              <div className="flex items-center gap-4 pt-2 text-xs text-white/70">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#14F5B0]" />
                  <span>Zero cash leakage</span>
                </div>
                <span>•</span>
                <div>100% On-chain audit trail</div>
                <span>•</span>
                <div>Verified Indian Universities</div>
              </div>
            </div>

            {/* Right Hero: Floating Protocol Tiles */}
            <div className="lg:col-span-5 relative hidden lg:flex items-center justify-center">
              <HeroTiles />
            </div>
          </div>
        </div>

        {/* Floating white rounded-top sheet overlapping hero bottom */}
        <div className="absolute left-0 right-0 -bottom-1 h-16 sm:h-24 bg-[#F5F7FF] rounded-t-[40px] sm:rounded-t-[60px] pointer-events-none transition-colors" />
      </section>

      {/* OVERLAPPING PROGRAMS PREVIEW SHEET */}
      <section className="relative -mt-16 sm:-mt-24 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-[32px] sm:rounded-[40px] border-2 border-[#0B1240]/10 shadow-soft-lg p-6 sm:p-10 mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1F2BFF]">
                Active Grant Pools
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-sans text-[#0B1240] mt-1">
                Featured Scholarship Programs
              </h2>
            </div>
            <Link
              to="/programs"
              className="text-sm font-bold text-[#1F2BFF] hover:text-[#161EC7] flex items-center gap-1.5 group"
            >
              <span>View all 12 programs</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 3 Featured Program Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_PROGRAMS.slice(0, 3).map((prog) => (
              <ProgramCard
                key={prog.id}
                program={prog}
                onApply={(p) => setSelectedProgramForApply(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. LIVE IMPACT STATS STRIP */}
      <section className="bg-white border-y-2 border-[#0B1240] py-10 sm:py-12 mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-y-8">
            {/* Stat 1 */}
            <div className="pr-4 md:pr-6">
              <StatCounter
                prefix="₹"
                value={PLATFORM_STATS.totalDistributed}
                label="Total Funds Distributed"
                sublabel="In ₹-pegged digital vouchers"
                badge="Live On-Chain"
              />
            </div>
            {/* Stat 2 */}
            <div className="px-4 md:px-6 border-l border-slate-200">
              <StatCounter
                value={PLATFORM_STATS.studentsFunded}
                label="Students Funded"
                sublabel="Across 84 Indian institutions"
              />
            </div>
            {/* Stat 3 */}
            <div className="px-4 md:px-6 md:border-l border-slate-200">
              <StatCounter
                value={PLATFORM_STATS.approvedMerchants}
                label="Approved Merchants"
                sublabel="Bookstores, labs & fee desks"
              />
            </div>
            {/* Stat 4 */}
            <div className="px-4 md:px-6 border-l border-slate-200">
              <StatCounter
                value={PLATFORM_STATS.verifiedTransactions}
                label="Verified Transactions"
                sublabel="100% cryptographic receipts"
              />
            </div>
            {/* Stat 5 — payout time */}
            <div className="px-4 md:px-6 md:border-l border-slate-200 col-span-2 md:col-span-1">
              <div className="flex flex-col">
                <div className="h-6 mb-2 flex items-center">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#C8F560] text-[#3F6200] whitespace-nowrap">
                    Disbursement Speed
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-display uppercase tracking-wide text-[#0B1240] leading-none whitespace-nowrap">
                  {PLATFORM_STATS.averagePayoutTime}
                </div>
                <div className="text-sm font-bold text-[#0B1240] mt-2 leading-tight">
                  Average Payout Time
                </div>
                <div className="text-[11px] text-red-500 font-semibold line-through mt-0.5 leading-tight">
                  vs {PLATFORM_STATS.oldSystemPayoutTime} (Old Way)
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 3. PROBLEM VS SOLUTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1F2BFF] bg-[#1F2BFF]/10 px-3.5 py-1 rounded-full">
            The Paradigm Shift
          </span>
          <h2 className="text-3xl sm:text-4xl font-display uppercase tracking-wide text-[#0B1240] mt-3">
            Why Scholarships Need Blockchain
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Moving away from bureaucratic delays and unrestricted cash to algorithmic purpose-bound grants.
          </p>
        </div>

        <FlowDiagram />
      </section>

      {/* 4. HOW IT WORKS (5 STEPS) */}
      <section id="how-it-works" className="bg-slate-50 border-y border-slate-200 py-16 mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00A651] bg-[#00A651]/10 px-3.5 py-1 rounded-full">
              Automated Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-display uppercase tracking-wide text-[#0B1240] mt-3">
              How EduFund Works in 5 Steps
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              From corporate donor deposit to university merchant POS terminal — completely verified on-chain.
            </p>
          </div>

          <StepTimeline />
        </div>
      </section>

      {/* 5. DONOR STORY CARD (NEO-BRUTALIST AMBER CARD) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-16">
        <NeoCard color="amber" shadowSize="lg" borderWidth="3" className="relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B1240] text-white text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#FFB300]" />
                Featured Corporate Case Story
              </div>

              <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-wide text-[#0B1240] leading-tight">
                Sponsor 500 engineering students with ₹10,00,000 — see exactly where every rupee goes.
              </h3>

              <p className="text-sm sm:text-base text-[#0B1240]/90 leading-relaxed font-sans max-w-2xl font-medium">
                When Acme Corp deployed ₹10,00,000 for undergraduate engineering scholars, their audit committee tracked every textbook purchase at BookNest Pune, semester fees at COEP, and lab kits at Silicon Hub in real-time. Zero paperwork, zero leakage, 100% verified impact.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link to="/donor">
                  <Button
                    variant="neo-lime"
                    size="lg"
                    iconRight={<ArrowRight className="w-4 h-4 text-[#0B1240]" />}
                  >
                    Start Sponsoring
                  </Button>
                </Link>

                <Link
                  to="/explorer"
                  className="text-xs sm:text-sm font-bold text-[#0B1240] hover:underline underline-offset-4"
                >
                  Explore Acme Corp’s on-chain receipts →
                </Link>
              </div>
            </div>

            {/* Right Mascot Illustration */}
            <div className="lg:col-span-4 flex items-center justify-center">
              <Mascot size="xl" mood="graduate" />
            </div>
          </div>
        </NeoCard>
      </section>

      {/* 6. TRUST / SECURITY ROW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1F2BFF]">
            Bulletproof Protocol
          </span>
          <h2 className="text-2xl sm:text-3xl font-display uppercase tracking-wide text-[#0B1240] mt-1">
            Institutional Trust & Cryptographic Security
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_FEATURES.map((feat, i) => (
            <div
              key={i}
              className="p-6 rounded-[24px] bg-white border border-slate-200/90 shadow-soft hover:shadow-md transition-shadow"
            >
              <div className="p-3 rounded-2xl bg-slate-100 w-fit mb-4">
                {getTrustIcon(feat.icon)}
              </div>
              <h4 className="text-base font-bold text-[#0B1240] mb-1.5">
                {feat.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FAQ ACCORDION + CTA BANNER */}
      <section className="bg-slate-50 border-t border-slate-200 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1F2BFF]">
              Everything You Need to Know
            </span>
            <h2 className="text-3xl sm:text-4xl font-display uppercase tracking-wide text-[#0B1240] mt-2">
              Frequently Asked Questions
            </h2>
          </div>

          <Accordion items={FAQ_ITEMS} allowMultiple={false} />

          {/* Bottom CTA Banner */}
          <div className="rounded-[28px] bg-[#1F2BFF] text-white p-8 sm:p-10 text-center space-y-4 shadow-xl border-2 border-[#14F5B0]">
            <h3 className="text-2xl sm:text-3xl font-display uppercase tracking-wide text-[#14F5B0]">
              Ready to Transform Education Funding?
            </h3>
            <p className="text-xs sm:text-sm text-white/90 max-w-lg mx-auto">
              Join leading corporate CSRs, university registrars, and students building India’s transparent scholarship ledger.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Link to="/programs">
                <Button variant="mint" size="md">
                  Apply for Scholarships
                </Button>
              </Link>
              <Link to="/merchants">
                <Button variant="outline-white" size="md">
                  Become a Merchant
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Apply Modal */}
      <ApplyProgramModal
        program={selectedProgramForApply}
        isOpen={Boolean(selectedProgramForApply)}
        onClose={() => setSelectedProgramForApply(null)}
      />
    </div>
  );
};
