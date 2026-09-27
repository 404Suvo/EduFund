import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { ScholarshipProgram } from '../../data/mockData';
import { formatINR } from '../../utils/format';
import { useWallet } from '../../context/WalletContext';
import { CheckCircle2, Shield, Upload, Sparkles, AlertCircle } from 'lucide-react';

interface ApplyProgramModalProps {
  program: ScholarshipProgram | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ApplyProgramModal: React.FC<ApplyProgramModalProps> = ({
  program,
  isOpen,
  onClose,
}) => {
  const { showToast } = useWallet();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [studentName, setStudentName] = useState('Aarav Sharma');
  const [collegeName, setCollegeName] = useState('COEP Technological University, Pune');
  const [cgpa, setCgpa] = useState('8.82');
  const [income, setIncome] = useState('₹4,50,000 / year');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!program) return null;

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
      setIsVerifying(true);
      setTimeout(() => {
        setIsVerifying(false);
        setIsSuccess(true);
        showToast(`Congratulations! Grant tokens for ${program.name} minted.`);
      }, 2000);
    }
  };

  const handleResetAndClose = () => {
    setStep(1);
    setIsSuccess(false);
    setIsVerifying(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleResetAndClose}
      title={isSuccess ? "Tokens Issued Successfully!" : `Apply for ${program.name}`}
      subtitle={isSuccess ? "Cryptographic grant voucher minted to your student wallet" : `Sponsored by ${program.sponsor} • ${formatINR(program.tokenPerStudent)} per student`}
      maxWidth="lg"
    >
      {!isSuccess ? (
        <div className="space-y-6">
          {/* Step indicator */}
          <div className="flex items-center justify-between px-2">
            <div className={`flex items-center gap-2 text-xs font-bold ${step >= 1 ? 'text-[#1F2BFF]' : 'text-slate-400'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-[#1F2BFF] text-white' : 'bg-slate-200 text-slate-500'}`}>1</span>
              <span>Student Profile</span>
            </div>
            <div className="h-0.5 w-12 bg-slate-200" />
            <div className={`flex items-center gap-2 text-xs font-bold ${step >= 2 ? 'text-[#1F2BFF]' : 'text-slate-400'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-[#1F2BFF] text-white' : 'bg-slate-200 text-slate-500'}`}>2</span>
              <span>Eligibility Proof</span>
            </div>
            <div className="h-0.5 w-12 bg-slate-200" />
            <div className={`flex items-center gap-2 text-xs font-bold ${step >= 3 ? 'text-[#1F2BFF]' : 'text-slate-400'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 3 ? 'bg-[#1F2BFF] text-white' : 'bg-slate-200 text-slate-500'}`}>3</span>
              <span>On-Chain Mint</span>
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name (as per College ID)
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white focus:border-[#1F2BFF] font-medium text-sm text-[#0B1240]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Enrolled College / University
                </label>
                <input
                  type="text"
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white focus:border-[#1F2BFF] font-medium text-sm text-[#0B1240]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Current CGPA / Aggregate
                  </label>
                  <input
                    type="text"
                    value={cgpa}
                    onChange={(e) => setCgpa(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white focus:border-[#1F2BFF] font-medium text-sm text-[#0B1240]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Annual Household Income
                  </label>
                  <input
                    type="text"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white focus:border-[#1F2BFF] font-medium text-sm text-[#0B1240]"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-100 flex items-start gap-2.5 text-xs text-blue-900">
                <Shield className="w-4 h-4 text-[#1F2BFF] shrink-0 mt-0.5" />
                <span>
                  Your personal documents are encrypted off-chain. Only a zero-knowledge cryptographic proof of eligibility will be committed to the public ledger.
                </span>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:border-[#1F2BFF] bg-slate-50 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-[#1F2BFF] mx-auto mb-2" />
                <div className="text-sm font-bold text-[#0B1240]">Upload College ID & Marksheet</div>
                <div className="text-xs text-slate-500 mt-1">PDF, PNG, or DigiLocker XML verified file (Max 10MB)</div>
                <div className="inline-block mt-3 px-3 py-1 bg-white rounded-full border border-slate-200 text-xs font-semibold text-slate-700">
                  id_card_verified_coep.pdf (Attached)
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Required Criteria Check:
                </div>
                {program.eligibility.map((crit, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-700 bg-white p-2 rounded-xl border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#00A651] shrink-0" />
                    <span>{crit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="py-8 text-center space-y-4">
              {isVerifying ? (
                <div className="space-y-3">
                  <div className="w-16 h-16 rounded-full border-4 border-[#1F2BFF] border-t-transparent animate-spin mx-auto" />
                  <h4 className="text-lg font-bold text-[#0B1240]">Verifying Zero-Knowledge Proof...</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Executing smart contract nullifier check, verifying academic merit, and preparing purpose-locked {program.tokenSymbol} tokens.
                  </p>
                </div>
              ) : null}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            {step > 1 && !isVerifying && (
              <Button
                variant="ghost"
                size="md"
                onClick={() => setStep((step - 1) as any)}
              >
                Back
              </Button>
            )}
            <Button
              variant="primary"
              size="md"
              disabled={isVerifying}
              onClick={handleNext}
            >
              {step === 1 ? 'Continue to Verification' : step === 2 ? 'Submit & Mint Tokens' : 'Processing...'}
            </Button>
          </div>
        </div>
      ) : (
        <div className="py-6 text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-[#14F5B0]/20 border-2 border-[#14F5B0] text-[#008A5E] flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <h4 className="text-2xl font-bold font-sans text-[#0B1240]">
              {formatINR(program.tokenPerStudent)} Minted!
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto">
              Your {program.tokenSymbol} tokens have been issued to wallet <strong>0x9402...89a1</strong>. You can now spend them at any approved campus merchant.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FDF0E1] border-2 border-[#0B1240] text-left text-xs space-y-1.5 shadow-neo-sm text-[#0B1240]">
            <div className="font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#FFB300]" />
              <span>Spend Rules Applied:</span>
            </div>
            <div>• Allowed Categories: <strong>{program.allowedCategories.join(', ')}</strong></div>
            <div>• Expiration: Valid until <strong>{program.deadline}</strong></div>
            <div>• Restrictions: Non-transferable to peer accounts. Blocked at retail merchants.</div>
          </div>

          <Button
            variant="neo-lime"
            size="lg"
            className="w-full"
            onClick={handleResetAndClose}
          >
            Open Student Dashboard & Spend
          </Button>
        </div>
      )}
    </Modal>
  );
};
