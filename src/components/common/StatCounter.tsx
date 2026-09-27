import React, { useEffect, useState } from 'react';
import { formatNumberIN } from '../../utils/format';

interface StatCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
  label: string;
  sublabel?: string;
  badge?: string;
  badgeColor?: 'mint' | 'lime';
}

export const StatCounter: React.FC<StatCounterProps> = ({
  value,
  prefix = '',
  suffix = '',
  durationMs = 1500,
  label,
  sublabel,
  badge,
  badgeColor = 'mint',
}) => {
  const [displayValue, setDisplayValue] = useState<number>(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / durationMs, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplayValue(Math.floor(easeProgress * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };
    const animId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animId);
  }, [value, durationMs]);

  const badgeStyles = badgeColor === 'lime'
    ? 'bg-[#C8F560] text-[#3F6200]'
    : 'bg-[#14F5B0]/20 text-[#008A5E] border border-[#14F5B0]/40';

  return (
    <div className="flex flex-col">
      {/* Fixed-height badge row — always present so numbers align */}
      <div className="h-6 mb-2 flex items-center">
        {badge ? (
          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap ${badgeStyles}`}>
            {badge}
          </span>
        ) : null}
      </div>

      {/* Number */}
      <div className="flex items-baseline gap-0.5 whitespace-nowrap">
        {prefix && (
          <span className="text-2xl sm:text-3xl font-display text-[#1F2BFF] leading-none">{prefix}</span>
        )}
        <span className="text-2xl sm:text-3xl font-display uppercase tracking-wide text-[#0B1240] leading-none">
          {formatNumberIN(displayValue)}
        </span>
        {suffix && (
          <span className="text-lg sm:text-xl text-slate-500 font-sans font-bold">{suffix}</span>
        )}
      </div>

      {/* Label */}
      <div className="text-sm font-bold text-[#0B1240] mt-2 leading-tight">
        {label}
      </div>

      {/* Sub-label */}
      {sublabel && (
        <div className="text-[11px] text-slate-400 mt-0.5 leading-tight">
          {sublabel}
        </div>
      )}
    </div>
  );
};
