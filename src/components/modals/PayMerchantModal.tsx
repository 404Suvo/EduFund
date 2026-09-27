import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { MOCK_MERCHANTS, Merchant, Transaction } from '../../data/mockData';
import { formatINR, copyToClipboard } from '../../utils/format';
import { useWallet } from '../../context/WalletContext';
import { QrCode, Store, CheckCircle2, ShieldAlert, ArrowRight, ShieldCheck, Copy, Check, ExternalLink } from 'lucide-react';

interface PayMerchantModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableBalance?: number;
}

export const PayMerchantModal: React.FC<PayMerchantModalProps> = ({
  isOpen,
  onClose,
  availableBalance = 12000,
}) => {
  const { showToast, currentStudent, walletAddress, addTransaction, transactions } = useWallet();
  const [selectedMerchantId, setSelectedMerchantId] = useState<string>(MOCK_MERCHANTS[0].id);
  const [amount, setAmount] = useState<number>(2500);
  const [itemDescription, setItemDescription] = useState('Machine Design Reference Handbook');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentResult, setPaymentResult] = useState<'success' | 'blocked' | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [currentCreatedTx, setCurrentCreatedTx] = useState<Transaction | null>(null);

  const selectedMerchant = MOCK_MERCHANTS.find((m) => m.id === selectedMerchantId) || MOCK_MERCHANTS[0];

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const newTxId = `tx-${(transactions.length + 1).toString().padStart(2, '0')}`;
      const randomHex = Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      const newTx: Transaction = {
        id: newTxId,
        hash: `0x${randomHex}`,
        fromName: `Student ${currentStudent.anonymizedId} (${currentStudent.name})`,
        fromAddress: walletAddress || '0x9402abf12c8901235b89a01f543dc8e7192ba01',
        toName: selectedMerchant.name,
        toAddress: selectedMerchant.address,
        amount: amount,
        category: selectedMerchant.category,
        status: 'Verified On-Chain',
        timestamp: new Date().toISOString(),
        blockNumber: 4892105 + transactions.length,
        programId: 'prog-01',
        purpose: itemDescription || 'Educational Material / Course / Books',
      };
      addTransaction(newTx);
      setCurrentCreatedTx(newTx);
      setIsProcessing(false);
      setPaymentResult('success');
      showToast(`Paid ${formatINR(amount)} to ${selectedMerchant.name} • On-chain verified`);
    }, 1200);
  };

  const handleSimulateBlocked = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const newTxId = `tx-${(transactions.length + 1).toString().padStart(2, '0')}`;
      const randomHex = Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      const blockedTx: Transaction = {
        id: newTxId,
        hash: `0x${randomHex}`,
        fromName: `Student ${currentStudent.anonymizedId} (${currentStudent.name})`,
        fromAddress: walletAddress || '0x9402abf12c8901235b89a01f543dc8e7192ba01',
        toName: 'Attempted: Café Java Bistro',
        toAddress: '0xunauthorized_cafe_99',
        amount: 320,
        category: 'Dining & Entertainment',
        status: 'Blocked Non-Education Tx',
        timestamp: new Date().toISOString(),
        blockNumber: 4892105 + transactions.length,
        programId: 'prog-01',
        purpose: 'Attempted non-educational consumption blocked by EduFund smart shield',
        blockReason: 'Non-whitelisted merchant category (Food/Dining). Funds locked to education partners.',
      };
      addTransaction(blockedTx);
      setCurrentCreatedTx(blockedTx);
      setIsProcessing(false);
      setPaymentResult('blocked');
    }, 1000);
  };

  const handleReset = () => {
    setPaymentResult(null);
    setIsProcessing(false);
    setCurrentCreatedTx(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title={paymentResult ? "Transaction Result" : "Pay at Approved Merchant"}
      subtitle={paymentResult ? "On-chain verification protocol output" : `Available Token Balance: ${formatINR(availableBalance)}`}
      maxWidth="md"
    >
      {!paymentResult ? (
        <div className="space-y-5">
          {/* QR Code Graphic / Scanner Box */}
          <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-300">
            <div className="w-32 h-32 bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-center mb-2">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Simulated QR Pattern */}
                <rect width="100" height="100" fill="white" />
                <rect x="10" y="10" width="25" height="25" fill="#0B1240" />
                <rect x="15" y="15" width="15" height="15" fill="white" />
                <rect x="18" y="18" width="9" height="9" fill="#0B1240" />

                <rect x="65" y="10" width="25" height="25" fill="#0B1240" />
                <rect x="70" y="15" width="15" height="15" fill="white" />
                <rect x="73" y="18" width="9" height="9" fill="#0B1240" />

                <rect x="10" y="65" width="25" height="25" fill="#0B1240" />
                <rect x="15" y="70" width="15" height="15" fill="white" />
                <rect x="18" y="73" width="9" height="9" fill="#0B1240" />

                <rect x="42" y="12" width="16" height="8" fill="#1F2BFF" />
                <rect x="42" y="26" width="12" height="12" fill="#0B1240" />
                <rect x="42" y="44" width="20" height="10" fill="#14F5B0" />
                <rect x="68" y="44" width="18" height="18" fill="#0B1240" />
                <rect x="44" y="68" width="22" height="14" fill="#0B1240" />
                <rect x="72" y="72" width="16" height="16" fill="#1F2BFF" />
              </svg>
            </div>
            <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
              <QrCode className="w-3.5 h-3.5 text-[#1F2BFF]" />
              Merchant POS Terminal Scan Ready
            </span>
          </div>

          {/* Select Merchant */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Select Verified Merchant:
            </label>
            <select
              value={selectedMerchantId}
              onChange={(e) => setSelectedMerchantId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white font-semibold text-sm text-[#0B1240] focus:border-[#1F2BFF]"
            >
              {MOCK_MERCHANTS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.city}) — {m.category}
                </option>
              ))}
            </select>
            <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00A651]" />
              <span>{selectedMerchant.address}</span>
            </div>
          </div>

          {/* Amount and description */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Amount (₹ Tokens)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-sm font-bold text-slate-400">₹</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-2 rounded-xl border border-slate-300 bg-white font-bold text-sm text-[#0B1240]"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Item / Service
              </label>
              <input
                type="text"
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white font-medium text-xs text-[#0B1240]"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2 pt-2">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isProcessing || amount <= 0 || amount > availableBalance}
              onClick={handlePay}
            >
              {isProcessing ? 'Verifying & Executing...' : `Confirm Payment of ${formatINR(amount)}`}
            </Button>

            <button
              type="button"
              onClick={handleSimulateBlocked}
              className="w-full text-center text-xs text-red-600 hover:text-red-700 underline font-semibold py-1 cursor-pointer"
            >
              Demo: Test spending at unauthorized merchant (Watch contract reject it)
            </button>
          </div>
        </div>
      ) : paymentResult === 'success' ? (
        <div className="py-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#14F5B0]/20 border-2 border-[#14F5B0] text-[#008A5E] flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="text-2xl font-bold font-sans text-[#0B1240]">
            Payment Settled On-Chain!
          </h4>
          <p className="text-xs text-slate-600 max-w-sm mx-auto">
            {formatINR(amount)} successfully transferred to <strong>{selectedMerchant.name}</strong> for {itemDescription}.
          </p>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left font-mono text-xs space-y-2 text-slate-700">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Tx ID:</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[#1F2BFF] font-bold">#{currentCreatedTx?.id.toUpperCase() || 'TX-01'}</span>
                <button
                  type="button"
                  onClick={() => {
                    copyToClipboard(currentCreatedTx?.id || 'tx-01');
                    setCopiedField('id');
                    setTimeout(() => setCopiedField(null), 2000);
                  }}
                  className="p-1 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors"
                  title="Copy Tx ID"
                >
                  {copiedField === 'id' ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Tx Hash:</span>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-800 font-semibold font-mono text-[11px]">
                  {currentCreatedTx?.hash ? `${currentCreatedTx.hash.slice(0, 6)}...${currentCreatedTx.hash.slice(-4)}` : '0x7f83...ba01'}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    copyToClipboard(currentCreatedTx?.hash || '0x7f83a21b44ec901235b89a01f543dc8e7192ba01');
                    setCopiedField('hash');
                    setTimeout(() => setCopiedField(null), 2000);
                  }}
                  className="p-1 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors"
                  title="Copy full hash"
                >
                  {copiedField === 'hash' ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">Merchant Category:</span>
              <span>{selectedMerchant.category}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">Status:</span>
              <span className="text-[#00A651] font-bold">100% Verified On-Chain</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-1">
            <Link
              to={`/explorer?tx=${currentCreatedTx?.id || 'tx-01'}`}
              onClick={handleReset}
              className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-center bg-[#1F2BFF] text-white hover:bg-[#161EC7] transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Inspect on Explorer</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <Button
              variant="outline"
              size="md"
              className="flex-1"
              onClick={handleReset}
            >
              Done
            </Button>
          </div>
        </div>
      ) : (
        /* Blocked Transaction Example (Section 5.D requirement) */
        <div className="py-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-red-100 border-2 border-red-500 text-red-600 flex items-center justify-center mx-auto shadow-md">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h4 className="text-2xl font-bold font-sans text-[#0B1240]">
            Transaction Blocked by Smart Shield
          </h4>
          <p className="text-xs text-slate-600 max-w-sm mx-auto">
            This merchant isn't approved for education spending. EduFund tokens are purpose-bound digital assets, not unrestricted cash.
          </p>

          <div className="p-4 rounded-2xl bg-[#FDF0E1] border-2 border-[#0B1240] text-left text-xs space-y-1.5 shadow-neo-sm text-[#0B1240]">
            <div className="font-bold text-[#F0552B] flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4" />
              <span>Contract Rejection Reason:</span>
            </div>
            <div>• Attempted Merchant: <strong>Non-Education Merchant (e.g. Cinema / Food App)</strong></div>
            <div>• Policy Rule: Category not in whitelist [Tech & Labs, Books, Fee Portals, Hostels]</div>
            <div>• Token Protection: <strong>No funds deducted from your balance.</strong></div>
          </div>

          <Button
            variant="primary"
            size="md"
            className="w-full"
            onClick={handleReset}
          >
            Back to Wallet
          </Button>
        </div>
      )}
    </Modal>
  );
};
