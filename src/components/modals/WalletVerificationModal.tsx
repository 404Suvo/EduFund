import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useWallet } from '../../context/WalletContext';
import { formatINR, truncateHash } from '../../utils/format';
import { 
  payMerchantOnChain, 
  depositPoolOnChain, 
  claimGrantVoucherOnChain, 
  accreditMerchantOnChain,
  type OnChainTransactionResult 
} from '../../midnight/contract';
import { 
  ShieldCheck, 
  Wallet, 
  Lock, 
  Cpu, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  ExternalLink,
  Coins,
  Copy,
  Check,
  Sparkles
} from 'lucide-react';

export interface WalletVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (result?: OnChainTransactionResult) => void | Promise<void>;
  transactionTitle: string;
  programOrMerchantName: string;
  amount: number;
  category?: string;
  recipientAddress?: string;
  circuitName?: string;
  details?: { label: string; value: string }[];
}

export const WalletVerificationModal: React.FC<WalletVerificationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  transactionTitle,
  programOrMerchantName,
  amount,
  category,
  recipientAddress = '0xd5ea58d1702899641495e5a879bd1696dadc611fd72c965351b7cabe3af0fbf3',
  circuitName = 'redeemGrant',
  details = [],
}) => {
  const { walletAddress, connectedApi, showToast } = useWallet();
  const [signingStep, setSigningStep] = useState<'review' | 'signing' | 'broadcasting' | 'done'>('review');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const activeWallet = walletAddress || 'mn_addr_preprod1cas900z8s709cja2k93a27lnz8z6l2cvfwxerwtlfzqt6fv3p3vqcx4d4j';

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSign = async () => {
    setSigningStep('signing');
    setErrorMessage(null);
    setStatusMessage(
      connectedApi 
        ? 'Midnight Wallet confirmation window opened! Please review and click Approve...' 
        : 'Deriving zero-knowledge witness & computing cryptographic nullifier...'
    );

    try {
      let result: OnChainTransactionResult;

      if (circuitName === 'depositPool') {
        result = await depositPoolOnChain(connectedApi, {
          amount,
          donorName: programOrMerchantName,
          onProgress: (msg) => setStatusMessage(msg),
        });
      } else if (circuitName === 'claimGrant') {
        result = await claimGrantVoucherOnChain(connectedApi, {
          studentName: programOrMerchantName,
          studentId: 'STU-9402',
          programId: 'prog-01',
          amount,
          onProgress: (msg) => setStatusMessage(msg),
        });
      } else if (circuitName === 'registerMerchant') {
        result = await accreditMerchantOnChain(connectedApi, {
          merchantName: programOrMerchantName,
          category: category || 'Education',
          merchantAddress: recipientAddress,
          onProgress: (msg) => setStatusMessage(msg),
        });
      } else {
        // Default: redeemGrant (student paying merchant)
        result = await payMerchantOnChain(connectedApi, {
          amount,
          merchantName: programOrMerchantName,
          merchantAddress: recipientAddress,
          category,
          onProgress: (msg) => setStatusMessage(msg),
        });
      }

      setSigningStep('broadcasting');
      setStatusMessage('Transaction finalized and verified on Midnight Preprod consensus!');
      await new Promise((r) => setTimeout(r, 600));

      setSigningStep('done');
      await new Promise((r) => setTimeout(r, 400));
      setSigningStep('review');
      await onConfirm(result);
    } catch (err: any) {
      console.warn('Wallet transaction error:', err);
      setSigningStep('review');
      setErrorMessage(err?.message || 'Transaction rejected in Midnight wallet.');
      showToast(err?.message || 'Transaction cancelled in wallet.');
    }
  };

  const handleClose = () => {
    if (signingStep !== 'signing' && signingStep !== 'broadcasting') {
      setSigningStep('review');
      setErrorMessage(null);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Verify Transaction with Wallet"
      subtitle="EduFund Smart Contract is requesting your cryptographic authorization"
      maxWidth="md"
    >
      <div className="space-y-5">
        {/* Network & Wallet Header Strip */}
        <div className="p-3.5 rounded-2xl bg-[#0B1240] text-white flex items-center justify-between border-2 border-[#14F5B0]/30 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#1F2BFF] flex items-center justify-center text-white">
              <Wallet className="w-4 h-4 text-[#14F5B0]" />
            </div>
            <div>
              <div className="text-xs font-bold flex items-center gap-1.5">
                <span>{connectedApi ? 'Midnight Lace Extension' : 'Midnight Lace (Sandbox Node)'}</span>
                <span className="w-2 h-2 rounded-full bg-[#14F5B0] animate-pulse" />
              </div>
              <div className="text-[10px] text-slate-300 font-mono">
                Preprod Testnet (Chain ID 0)
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-lg font-mono text-[11px] text-slate-200">
            <span>{truncateHash(activeWallet)}</span>
            <button
              type="button"
              onClick={() => handleCopy(activeWallet)}
              className="p-1 hover:text-[#14F5B0] transition-colors"
              title="Copy connected address"
            >
              {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3 text-slate-300" />}
            </button>
          </div>
        </div>

        {/* Transaction Value Banner */}
        <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 text-center space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Total Authorized Amount
          </span>
          <div className="text-3xl font-display font-bold text-[#1F2BFF]">
            {formatINR(amount)}
          </div>
          <div className="text-xs font-semibold text-[#0B1240]">
            {transactionTitle}
          </div>
        </div>

        {/* Payload Parameters */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-soft text-xs space-y-2.5 font-sans">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500">Target / Recipient:</span>
            <span className="font-bold text-[#0B1240] text-right">{programOrMerchantName}</span>
          </div>

          {category && (
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">Educational Category:</span>
              <span className="font-semibold text-slate-800">{category}</span>
            </div>
          )}

          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500">Compact Circuit:</span>
            <span className="font-mono font-bold text-[#1F2BFF]">{circuitName}()</span>
          </div>

          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500">Contract Address:</span>
            <span className="font-mono text-[11px] text-slate-700 truncate max-w-[180px]">
              {truncateHash(recipientAddress)}
            </span>
          </div>

          {details.map((d, idx) => (
            <div key={idx} className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">{d.label}:</span>
              <span className="font-semibold text-slate-800 text-right">{d.value}</span>
            </div>
          ))}

          <div className="flex items-center justify-between pt-0.5">
            <span className="text-slate-500">Estimated Gas Fee:</span>
            <span className="font-mono font-semibold text-green-700">0.0042 tNIGHT (~ ₹0.00)</span>
          </div>
        </div>

        {/* Zero Knowledge Privacy Notice */}
        <div className="p-3.5 rounded-2xl bg-[#14F5B0]/10 border border-[#14F5B0]/40 flex items-start gap-2.5 text-xs text-[#006A48]">
          <ShieldCheck className="w-4 h-4 text-[#008A5E] shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold block">Zero-Knowledge Witness Guarantee</span>
            <p className="text-[11px] leading-relaxed text-slate-600">
              Your private student credentials, secrets, and identity remain off-chain. Only the cryptographic proof and nullifier are submitted to Midnight Preprod.
            </p>
          </div>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Signing status or action buttons */}
        {signingStep === 'signing' || signingStep === 'broadcasting' ? (
          <div className="p-5 rounded-2xl bg-[#0B1240] text-white text-center space-y-3 font-mono text-xs shadow-lg">
            <div className="w-9 h-9 rounded-full border-3 border-[#14F5B0] border-t-transparent animate-spin mx-auto" />
            <div className="text-[#14F5B0] font-bold text-sm">
              {signingStep === 'signing' 
                ? 'Awaiting Midnight Wallet Approval...' 
                : 'Broadcasting to Midnight Preprod consensus...'}
            </div>
            <div className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">
              {statusMessage || 'Please approve the transaction prompt in your Midnight Lace Wallet window.'}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 pt-2">
            <Button
              variant="outline"
              size="md"
              className="flex-1"
              onClick={handleClose}
            >
              Reject
            </Button>

            <Button
              variant="mint"
              size="md"
              className="flex-1 font-bold text-[#0B1240]"
              onClick={handleSign}
              icon={<ShieldCheck className="w-4 h-4 text-[#0B1240]" />}
            >
              Sign &amp; Verify with Wallet
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};
