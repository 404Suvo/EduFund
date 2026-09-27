import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useWallet } from '../../context/WalletContext';
import { Store, CheckCircle2, ShieldCheck, Building2, FileText } from 'lucide-react';

interface MerchantApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MerchantApplyModal: React.FC<MerchantApplyModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { showToast } = useWallet();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [businessName, setBusinessName] = useState('Apex Scientific Instruments & Books');
  const [category, setCategory] = useState('Tech & Labs');
  const [city, setCity] = useState('Pune');
  const [gstin, setGstin] = useState('27AAACA1234A1Z5');
  const [address, setAddress] = useState('Near SP College, Sadashiv Peth, Pune 411030');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep((step + 1) as any);
    } else {
      setIsSubmitted(true);
      showToast('Merchant accreditation application submitted for review!');
    }
  };

  const handleReset = () => {
    setStep(1);
    setIsSubmitted(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title={isSubmitted ? "Application Received!" : "Apply to Become an Approved Merchant"}
      subtitle={isSubmitted ? "Our verification node is auditing your establishment details" : "Join the on-chain educational network and receive instant smart-voucher payments"}
      maxWidth="lg"
    >
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Steps */}
          <div className="flex items-center justify-between px-2">
            <div className={`flex items-center gap-1.5 text-xs font-bold ${step >= 1 ? 'text-[#1F2BFF]' : 'text-slate-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-[#1F2BFF] text-white' : 'bg-slate-200 text-slate-500'}`}>1</span>
              <span>Establishment</span>
            </div>
            <div className="h-0.5 w-10 bg-slate-200" />
            <div className={`flex items-center gap-1.5 text-xs font-bold ${step >= 2 ? 'text-[#1F2BFF]' : 'text-slate-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-[#1F2BFF] text-white' : 'bg-slate-200 text-slate-500'}`}>2</span>
              <span>GSTIN & Verification</span>
            </div>
            <div className="h-0.5 w-10 bg-slate-200" />
            <div className={`flex items-center gap-1.5 text-xs font-bold ${step >= 3 ? 'text-[#1F2BFF]' : 'text-slate-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-[#1F2BFF] text-white' : 'bg-slate-200 text-slate-500'}`}>3</span>
              <span>Settlement Node</span>
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Registered Business Name
                </label>
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white font-semibold text-sm text-[#0B1240] focus:border-[#1F2BFF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Merchant Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white font-semibold text-xs text-[#0B1240] focus:border-[#1F2BFF]"
                  >
                    <option value="Books & Stationery">Books & Stationery</option>
                    <option value="Tuition & Coaching">Tuition & Coaching</option>
                    <option value="Hostels">Hostels & Accommodation</option>
                    <option value="Fee Portals">University / College Fee Counter</option>
                    <option value="Tech & Labs">Tech & Labs Equipment</option>
                    <option value="Online Courses">Online Educational Courses</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Primary City
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white font-semibold text-sm text-[#0B1240] focus:border-[#1F2BFF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Physical Store Address (Proximity to Campus)
                </label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-slate-300 bg-white font-medium text-xs text-[#0B1240] focus:border-[#1F2BFF]"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  15-digit GSTIN / Tax Identification
                </label>
                <input
                  type="text"
                  required
                  value={gstin}
                  onChange={(e) => setGstin(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white font-mono font-bold text-sm text-[#0B1240] focus:border-[#1F2BFF]"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-600">
                <div className="font-bold text-[#0B1240] flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#1F2BFF]" />
                  <span>Required Verification Documents:</span>
                </div>
                <div>• Trade License / Shop & Establishment Act Certificate</div>
                <div>• Cancelled Cheque for Automated Daily INR Settlement</div>
                <div>• College Proximity Declaration or Campus MoU agreement</div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#0B1240] text-white space-y-2 border-2 border-[#14F5B0]">
                <div className="text-xs text-[#14F5B0] font-mono flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#14F5B0]" />
                  <span>Settlement Contract Node</span>
                </div>
                <div className="text-xs text-slate-300">
                  Your merchant wallet address will be bound to the smart contract whitelist:
                </div>
                <div className="font-mono text-xs text-[#14F5B0] bg-white/10 p-2.5 rounded-xl break-all">
                  0xmerch_apex_pune_991823901a881920391a
                </div>
              </div>

              <div className="text-xs text-slate-600">
                By submitting, you agree that your merchant node will only accept EduFund tokens for educational goods and books, and never exchange vouchers for cash or unrestricted consumer items.
              </div>
            </div>
          )}

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            {step > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="md"
                onClick={() => setStep((step - 1) as any)}
              >
                Back
              </Button>
            )}
            <Button
              type="submit"
              variant="primary"
              size="md"
            >
              {step < 3 ? 'Next Step' : 'Submit for Whitelist Approval'}
            </Button>
          </div>
        </form>
      ) : (
        <div className="py-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#14F5B0]/20 border-2 border-[#14F5B0] text-[#008A5E] flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h4 className="text-2xl font-bold font-sans text-[#0B1240]">
            Application Under Audit Review
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            Your establishment <strong>{businessName}</strong> ({city}) has been assigned verification ticket <strong>#EDUMERCH-8821</strong>.
          </p>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-left space-y-1">
            <div className="font-semibold text-[#0B1240]">Expected Turnaround: &lt; 24 Hours</div>
            <div className="text-slate-500">Upon approval, your store will appear in the verified merchant directory, and your official QR terminal kit will be activated.</div>
          </div>

          <Button
            variant="neo-lime"
            size="md"
            className="w-full"
            onClick={handleReset}
          >
            Return to Merchant Directory
          </Button>
        </div>
      )}
    </Modal>
  );
};
