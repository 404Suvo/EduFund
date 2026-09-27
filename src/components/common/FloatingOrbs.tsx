import React from 'react';

export const FloatingOrbs: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {/* Amber/Yellow Orb */}
      <div className="absolute top-[12%] right-[8%] w-16 h-16 rounded-full bg-[#FFB300] opacity-80 blur-[1px] shadow-lg animate-float-slow" />

      {/* Mint/Green Orb */}
      <div className="absolute bottom-[24%] right-[32%] w-12 h-12 rounded-full bg-[#14F5B0] opacity-75 blur-[1px] shadow-md animate-float-delayed" />

      {/* Sky Blue Orb */}
      <div className="absolute top-[42%] left-[6%] w-14 h-14 rounded-full bg-[#6ECFE0] opacity-70 blur-[1px] shadow-lg animate-float-slow" />

      {/* Purple Orb */}
      <div className="absolute top-[28%] right-[44%] w-10 h-10 rounded-full bg-[#9D4EDD] opacity-60 blur-[1px] shadow-md animate-float-delayed" />

      {/* Orange-Red Orb */}
      <div className="absolute bottom-[16%] left-[18%] w-8 h-8 rounded-full bg-[#F0552B] opacity-75 blur-[1px] shadow-sm animate-float-slow" />
    </div>
  );
};
