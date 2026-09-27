import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { NeoCard } from '../components/common/NeoCard';
import { Mascot } from '../components/common/Mascot';
import { Home as HomeIcon } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen relative flex flex-col justify-between overflow-hidden bg-[#6ECFE0] select-none">
      {/* Sky Blue Area with Clouds */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Cartoon Clouds */}
        <div className="absolute top-12 left-16 w-32 h-14 bg-white/70 rounded-full blur-[1px]" />
        <div className="absolute top-20 right-24 w-44 h-18 bg-white/60 rounded-full blur-[1px]" />
        <div className="absolute top-36 left-1/3 w-28 h-12 bg-white/50 rounded-full blur-[1px]" />
      </div>

      {/* Main Centered Content */}
      <div className="relative z-20 flex-1 flex items-center justify-center p-4 sm:p-6 my-12">
        <NeoCard
          color="amber"
          shadowSize="lg"
          borderWidth="3"
          className="max-w-md w-full text-center space-y-6 animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Mascot in card */}
          <div className="flex justify-center">
            <Mascot size="lg" mood="graduate" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0B1240] bg-[#FDF0E1] px-3 py-1 rounded-full border border-[#0B1240]">
              Error 404 • Degree Completed
            </span>
            <h1 className="font-display text-4xl sm:text-5xl uppercase tracking-wide text-[#0B1240] leading-none">
              Oops, this page graduated.
            </h1>
            <p className="text-xs sm:text-sm text-[#0B1240]/80 font-medium leading-relaxed max-w-xs mx-auto">
              The link you followed has already received its degree and left campus. Head back to the scholarship portal!
            </p>
          </div>

          <div className="pt-2">
            <Link to="/">
              <Button
                variant="neo-lime"
                size="lg"
                className="w-full"
                icon={<HomeIcon className="w-4 h-4 text-[#0B1240]" />}
              >
                Back to Home
              </Button>
            </Link>
          </div>
        </NeoCard>
      </div>

      {/* Ground Section (Grass Green #00A651 with Cartoon Tree with Oranges) */}
      <div className="relative z-10 w-full h-44 sm:h-56 bg-[#00A651] border-t-4 border-[#0B1240] flex items-end justify-between px-6 sm:px-16 overflow-hidden">
        {/* Left Cartoon Tree with Oranges */}
        <div className="relative -bottom-4 w-40 sm:w-56 h-48 sm:h-64 shrink-0">
          <svg viewBox="0 0 160 200" className="w-full h-full">
            {/* Trunk */}
            <path
              d="M72 110 L68 200 L92 200 L88 110 Z"
              fill="#8B4513"
              stroke="#0B1240"
              strokeWidth="3.5"
            />
            {/* Foliage - big friendly round clusters */}
            <circle cx="80" cy="80" r="50" fill="#00C853" stroke="#0B1240" strokeWidth="3.5" />
            <circle cx="50" cy="70" r="35" fill="#00E676" stroke="#0B1240" strokeWidth="3" />
            <circle cx="110" cy="70" r="35" fill="#00E676" stroke="#0B1240" strokeWidth="3" />
            <circle cx="80" cy="45" r="32" fill="#69F0AE" stroke="#0B1240" strokeWidth="3" />

            {/* Cartoon Oranges */}
            <circle cx="55" cy="65" r="7" fill="#F0552B" stroke="#0B1240" strokeWidth="2" />
            <circle cx="85" cy="55" r="7" fill="#FFB300" stroke="#0B1240" strokeWidth="2" />
            <circle cx="105" cy="75" r="7" fill="#F0552B" stroke="#0B1240" strokeWidth="2" />
            <circle cx="70" cy="95" r="7" fill="#FFB300" stroke="#0B1240" strokeWidth="2" />
            <circle cx="95" cy="95" r="7" fill="#F0552B" stroke="#0B1240" strokeWidth="2" />
          </svg>
        </div>

        {/* Right Campus Hills & Flowers */}
        <div className="relative -bottom-2 w-32 sm:w-44 h-24 sm:h-32 hidden sm:block">
          <svg viewBox="0 0 120 80" className="w-full h-full">
            <ellipse cx="60" cy="80" rx="60" ry="30" fill="#008A3E" stroke="#0B1240" strokeWidth="3" />
            {/* Tiny cartoon flowers */}
            <circle cx="35" cy="65" r="4" fill="#FFB300" />
            <circle cx="75" cy="60" r="4" fill="#FFFFFF" />
            <circle cx="95" cy="68" r="4" fill="#14F5B0" />
          </svg>
        </div>
      </div>
    </div>
  );
};
