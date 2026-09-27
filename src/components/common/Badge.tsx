import React from 'react';

export type BadgeVariant = 'mint' | 'blue' | 'amber' | 'red' | 'green' | 'gray' | 'navy' | 'lime';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'blue',
  icon,
  className = '',
}) => {
  const variantStyles = {
    mint: 'bg-[#14F5B0]/20 text-[#009165] border border-[#14F5B0]/50',
    blue: 'bg-[#1F2BFF]/10 text-[#1F2BFF] border border-[#1F2BFF]/20',
    amber: 'bg-[#FFB300]/20 text-[#A06E00] border border-[#FFB300]/40',
    red: 'bg-[#F0552B]/15 text-[#D1340B] border border-[#F0552B]/30',
    green: 'bg-[#00A651]/15 text-[#00823E] border border-[#00A651]/30',
    gray: 'bg-slate-100 text-slate-700 border border-slate-200',
    navy: 'bg-[#0B1240] text-white border border-[#0B1240]',
    lime: 'bg-[#C8F560]/30 text-[#456A00] border border-[#C8F560]',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold select-none ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
};
