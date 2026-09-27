import React from 'react';

export type NeoColor = 'amber' | 'cream' | 'lime' | 'sky' | 'white';

interface NeoCardProps {
  color?: NeoColor;
  children: React.ReactNode;
  className?: string;
  shadowSize?: 'sm' | 'md' | 'lg';
  borderWidth?: '2' | '3';
}

export const NeoCard: React.FC<NeoCardProps> = ({
  color = 'amber',
  children,
  className = '',
  shadowSize = 'md',
  borderWidth = '3',
}) => {
  const colorMap: Record<NeoColor, string> = {
    amber: 'bg-[#FFB300] text-[#0B1240]',
    cream: 'bg-[#FDF0E1] text-[#0B1240]',
    lime: 'bg-[#C8F560] text-[#0B1240]',
    sky: 'bg-[#6ECFE0] text-[#0B1240]',
    white: 'bg-white text-[#0B1240]',
  };

  const shadowMap = {
    sm: 'shadow-[3px_3px_0px_#0B1240]',
    md: 'shadow-[4px_4px_0px_#0B1240]',
    lg: 'shadow-[6px_6px_0px_#0B1240]',
  };

  const borderClass = borderWidth === '2' 
    ? 'border-2 border-[#0B1240]' 
    : 'border-[3px] border-[#0B1240]';

  return (
    <div
      className={`rounded-[24px] ${colorMap[color]} ${borderClass} ${shadowMap[shadowSize]} p-6 sm:p-8 transition-transform duration-200 ${className}`}
    >
      {children}
    </div>
  );
};
