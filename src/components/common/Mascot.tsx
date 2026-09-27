import React from 'react';

interface MascotProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  mood?: 'happy' | 'graduate' | 'detective' | 'curious';
  className?: string;
}

export const Mascot: React.FC<MascotProps> = ({
  size = 'md',
  mood = 'graduate',
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-36 h-36',
    xl: 'w-48 h-48',
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${sizeMap[size]} ${className}`}>
      <svg
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md select-none"
      >
        {/* Glow / Shadow under mascot */}
        <ellipse cx="80" cy="145" rx="55" ry="10" fill="#0B1240" fillOpacity="0.15" />

        {/* Character Body - Warm round friendly shape */}
        <circle cx="80" cy="85" r="48" fill="#FFB300" stroke="#0B1240" strokeWidth="4" />

        {/* Belly patch */}
        <circle cx="80" cy="94" r="30" fill="#FDF0E1" />

        {/* Eyes */}
        <ellipse cx="64" cy="78" rx="6" ry="8" fill="#0B1240" />
        <ellipse cx="96" cy="78" rx="6" ry="8" fill="#0B1240" />
        {/* Catchlights in eyes */}
        <circle cx="62" cy="75" r="2.5" fill="#FFFFFF" />
        <circle cx="94" cy="75" r="2.5" fill="#FFFFFF" />

        {/* Rosy Cheeks */}
        <ellipse cx="54" cy="88" rx="5" ry="3" fill="#F0552B" fillOpacity="0.4" />
        <ellipse cx="106" cy="88" rx="5" ry="3" fill="#F0552B" fillOpacity="0.4" />

        {/* Smile */}
        <path
          d="M70 94 Q80 105 90 94"
          stroke="#0B1240"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Graduation Cap (Mortarboard) */}
        {mood === 'graduate' && (
          <g>
            {/* Cap base */}
            <path
              d="M58 46 C58 46 68 55 80 55 C92 55 102 46 102 46 L98 52 C98 52 90 60 80 60 C70 60 62 52 62 52 Z"
              fill="#0B1240"
              stroke="#0B1240"
              strokeWidth="2"
            />
            {/* Diamond Board */}
            <polygon
              points="80,18 135,36 80,54 25,36"
              fill="#1F2BFF"
              stroke="#0B1240"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* Cap Center Button */}
            <circle cx="80" cy="36" r="4" fill="#14F5B0" stroke="#0B1240" strokeWidth="2" />
            {/* Tassel String & Hanging Charm */}
            <path
              d="M80 36 C105 40 120 50 124 64"
              stroke="#14F5B0"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="124" cy="67" r="4" fill="#C8F560" stroke="#0B1240" strokeWidth="2" />
          </g>
        )}

        {/* Golden EduFund Coin / Token in Hand */}
        <g transform="translate(100, 95)">
          <circle cx="14" cy="14" r="14" fill="#C8F560" stroke="#0B1240" strokeWidth="3" />
          <text
            x="14"
            y="19"
            textAnchor="middle"
            fill="#0B1240"
            fontSize="12"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            ₹
          </text>
        </g>
      </svg>
    </div>
  );
};
