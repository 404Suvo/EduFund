import React, { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { MOCK_TRANSACTIONS } from '../data/mockData';
import { TokenWalletCard } from '../components/cards/TokenWalletCard';
import { TxTable } from '../components/sections/TxTable';
import { PayMerchantModal } from '../components/modals/PayMerchantModal';
import { Button } from '../components/common/Button';
import { 
  GraduationCap, 
  Coins, 
  History, 
  ShieldCheck, 
  BookOpen, 
  Laptop, 
  Building 
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { currentStudent, transactions } = useWallet();
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);

  // Student specific transactions (from live context)
  const studentTxs = transactions.filter((t) =>
    t.fromName.includes(currentStudent.anonymizedId)
  );

  return (
    <div className="min-h-screen bg-[#F5F7FF] pb-24 transition-colors">
      {/* Top Banner */}
      <section className="bg-[#0B1240] text-white py-10 border-b-4 border-[#14F5B0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#1F2BFF] flex items-center justify-center text-white shadow-lg text-2xl font-bold">
              🎓
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-mono font-bold text-[#14F5B0]">
                  {currentStudent.anonymizedId}
                </span>
                <span className="text-xs text-slate-300">• {currentStudent.degree}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold font-sans">
                {currentStudent.name}’s Student Portal
              </h1>
              <p className="text-xs text-slate-300 mt-0.5">
                {currentStudent.college} • GPA: <strong>{currentStudent.gpa}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="mint"
              size="md"
              onClick={() => setIsPayModalOpen(true)}
            >
              Scan & Pay Merchant
            </Button>
          </div>
        </div>
      </section>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        {/* Token Wallet Card with Stepper, Buckets, and Blocked Example */}
        <TokenWalletCard
          student={currentStudent}
          onOpenPayModal={() => setIsPayModalOpen(true)}
          onTriggerBlockedDemo={() => setIsPayModalOpen(true)}
        />

        {/* Student's Verified Transaction History */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-[#1F2BFF]" />
              <h3 className="text-xl font-bold font-sans text-[#0B1240]">
                My Educational Spend History
              </h3>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              {studentTxs.length} records found
            </span>
          </div>

          <TxTable transactions={studentTxs} maxRows={10} />
        </div>
      </div>

      {/* QR Pay Modal */}
      <PayMerchantModal
        isOpen={isPayModalOpen}
        onClose={() => setIsPayModalOpen(false)}
        availableBalance={currentStudent.remainingTokens}
      />
    </div>
  );
};
