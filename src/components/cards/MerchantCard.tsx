import React from 'react';
import { Merchant } from '../../data/mockData';
import { formatINR } from '../../utils/format';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { 
  Store, 
  MapPin, 
  CheckCircle2, 
  Star, 
  Phone, 
  ReceiptText, 
  QrCode 
} from 'lucide-react';

interface MerchantCardProps {
  merchant: Merchant;
  onPay?: (merchant: Merchant) => void;
}

export const MerchantCard: React.FC<MerchantCardProps> = ({
  merchant,
  onPay,
}) => {
  return (
    <div className="bg-white rounded-[24px] border border-slate-200/90 shadow-soft hover:shadow-soft-lg hover:border-[#1F2BFF]/30 transition-all duration-300 p-6 flex flex-col justify-between">
      <div>
        {/* Top bar */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-[#1F2BFF]/10 text-[#1F2BFF] flex items-center justify-center font-bold">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#1F2BFF] block">
                {merchant.category}
              </span>
              <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>{merchant.city}</span>
              </div>
            </div>
          </div>

          {merchant.verified && (
            <Badge variant="mint" icon={<CheckCircle2 className="w-3.5 h-3.5 text-[#008A5E]" />}>
              Verified
            </Badge>
          )}
        </div>

        {/* Merchant Name */}
        <h3 className="text-lg font-bold text-[#0B1240] mb-2 leading-snug">
          {merchant.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
          {merchant.description}
        </p>

        {/* Stats strip */}
        <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-100 mb-4 text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Received</span>
            <span className="font-bold text-[#0B1240] font-sans text-sm">{formatINR(merchant.totalReceived)}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Rating & Volume</span>
            <div className="flex items-center gap-1 font-bold text-amber-600">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{merchant.rating}</span>
              <span className="text-slate-400 font-normal">({merchant.txCount} tx)</span>
            </div>
          </div>
        </div>

        {/* Accepted programs list */}
        <div className="space-y-1.5 mb-5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Accepted Program Vouchers:
          </span>
          <div className="flex flex-wrap gap-1">
            {merchant.acceptedPrograms.slice(0, 2).map((prog, i) => (
              <span
                key={i}
                className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium truncate max-w-[200px]"
                title={prog}
              >
                {prog}
              </span>
            ))}
            {merchant.acceptedPrograms.length > 2 && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-bold">
                +{merchant.acceptedPrograms.length - 2} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="pt-3 border-t border-slate-100 flex gap-2">
        <Button
          variant="primary"
          size="sm"
          className="flex-1 justify-center font-bold"
          icon={<QrCode className="w-3.5 h-3.5 text-[#14F5B0]" />}
          onClick={() => onPay ? onPay(merchant) : null}
        >
          Pay at Terminal
        </Button>
      </div>
    </div>
  );
};
