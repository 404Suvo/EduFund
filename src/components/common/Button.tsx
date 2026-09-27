import React from 'react';

export type ButtonVariant = 'primary' | 'mint' | 'lime' | 'outline' | 'outline-white' | 'ghost' | 'neo-amber' | 'neo-lime';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  iconRight,
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-full cursor-pointer select-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeClasses = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5 font-semibold',
    md: 'text-sm px-5 py-2.5 gap-2 font-semibold',
    lg: 'text-base px-7 py-3.5 gap-2.5 font-bold',
  };

  const variantClasses = {
    primary: 'bg-[#1F2BFF] text-white hover:bg-[#161EC7] shadow-sm hover:shadow-md active:scale-[0.98]',
    mint: 'bg-[#14F5B0] text-[#0B1240] hover:bg-[#00DF9F] shadow-sm hover:shadow-glow-mint active:scale-[0.98] font-bold',
    lime: 'bg-[#C8F560] text-[#0B1240] hover:bg-[#B5E84A] shadow-sm active:scale-[0.98] font-bold',
    outline: 'border-2 border-[#1F2BFF] text-[#1F2BFF] bg-transparent hover:bg-[#1F2BFF]/5 active:scale-[0.98]',
    'outline-white': 'border-2 border-white text-white bg-transparent hover:bg-white/10 active:scale-[0.98]',
    ghost: 'text-[#0B1240] bg-transparent hover:bg-slate-100 active:scale-[0.98]',
    'neo-amber': 'bg-[#FFB300] text-[#0B1240] border-2 border-[#0B1240] shadow-neo font-bold hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo-lg active:translate-x-[1px] active:translate-y-[1px] active:shadow-none',
    'neo-lime': 'bg-[#C8F560] text-[#0B1240] border-2 border-[#0B1240] shadow-neo font-bold hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo-lg active:translate-x-[1px] active:translate-y-[1px] active:shadow-none',
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {iconRight && <span className="shrink-0">{iconRight}</span>}
    </button>
  );
};
