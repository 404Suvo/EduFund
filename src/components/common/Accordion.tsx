import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  q: string;
  a: string;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  className = '',
}) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  const toggle = (idx: number) => {
    if (allowMultiple) {
      setOpenIndexes((prev) =>
        prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
      );
    } else {
      setOpenIndexes((prev) => (prev.includes(idx) ? [] : [idx]));
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item, idx) => {
        const isOpen = openIndexes.includes(idx);
        return (
          <div
            key={idx}
            className={`rounded-[18px] border transition-all duration-200 overflow-hidden ${
              isOpen
                ? 'bg-white border-[#1F2BFF]/30 shadow-md ring-1 ring-[#1F2BFF]/10'
                : 'bg-white/80 hover:bg-white border-slate-200'
            }`}
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full px-6 py-4 sm:py-5 flex items-center justify-between text-left gap-4 cursor-pointer"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-base sm:text-lg text-[#0B1240]">
                {item.q}
              </span>
              <span
                className={`p-1.5 rounded-full transition-transform duration-200 shrink-0 ${
                  isOpen ? 'bg-[#1F2BFF] text-white rotate-180' : 'bg-slate-100 text-slate-500'
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </span>
            </button>
            {isOpen && (
              <div className="px-6 pb-5 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100">
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
