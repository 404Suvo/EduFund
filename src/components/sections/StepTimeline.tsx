import React, { useState } from 'react';
import { HOW_IT_WORKS_STEPS } from '../../data/mockData';
import { 
  ShieldCheck, 
  Coins, 
  GraduationCap, 
  Store, 
  FileSpreadsheet, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

export const StepTimeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const getIcon = (name: string, color: string) => {
    const props = { className: "w-6 h-6", style: { color } };
    switch (name) {
      case 'ShieldCheck': return <ShieldCheck {...props} />;
      case 'Coins': return <Coins {...props} />;
      case 'GraduationCap': return <GraduationCap {...props} />;
      case 'Store': return <Store {...props} />;
      case 'FileSpreadsheet': return <FileSpreadsheet {...props} />;
      default: return <ShieldCheck {...props} />;
    }
  };

  const currentStep = HOW_IT_WORKS_STEPS.find((s) => s.step === activeStep) || HOW_IT_WORKS_STEPS[0];

  return (
    <div className="space-y-8">
      {/* 5 Step Pills / Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {HOW_IT_WORKS_STEPS.map((s) => {
          const isSelected = activeStep === s.step;
          return (
            <button
              key={s.step}
              type="button"
              onMouseEnter={() => setActiveStep(s.step)}
              onClick={() => setActiveStep(s.step)}
              className={`p-4 rounded-[20px] text-left transition-all duration-200 cursor-pointer flex flex-col justify-between border ${
                isSelected
                  ? 'bg-[#1F2BFF] text-white border-[#1F2BFF] shadow-lg scale-102 ring-2 ring-[#14F5B0]'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-[#1F2BFF]/40 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    isSelected ? 'bg-[#14F5B0] text-[#0B1240]' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {s.step}
                </span>
                <span className="p-1 rounded-lg bg-white/10">
                  {getIcon(s.icon, isSelected ? '#14F5B0' : s.color)}
                </span>
              </div>
              <div className="font-bold text-xs sm:text-sm leading-snug line-clamp-2">
                {s.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Detail Highlight Card */}
      <div className="bg-white rounded-[28px] border-2 border-[#0B1240] shadow-neo p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FFB300] text-[#0B1240] border border-[#0B1240]">
              Step 0{currentStep.step} of 05
            </span>
            <span className="text-xs text-slate-500 font-mono">
              Hover any step above to inspect
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold font-sans text-[#0B1240]">
            {currentStep.title}
          </h3>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {currentStep.detail}
          </p>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#00A651]">
            <CheckCircle2 className="w-4 h-4" />
            <span>Guaranteed by smart contract consensus</span>
          </div>
        </div>

        {/* Visual Graphic box */}
        <div className="w-full md:w-80 h-56 rounded-2xl bg-gradient-to-br from-[#0B1240] to-[#1F2BFF] p-6 text-white flex flex-col justify-between shadow-md relative overflow-hidden shrink-0">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#14F5B0]">Protocol Node #{currentStep.step}</span>
            <div className="w-3 h-3 rounded-full bg-[#14F5B0] animate-pulse" />
          </div>

          <div className="flex items-center justify-center py-2">
            <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shadow-lg">
              {getIcon(currentStep.icon, '#14F5B0')}
            </div>
          </div>

          <div className="text-[11px] text-center text-slate-300 font-mono">
            {currentStep.shortDesc}
          </div>
        </div>
      </div>
    </div>
  );
};
