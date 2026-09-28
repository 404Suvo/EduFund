import React, { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { 
  MOCK_DONORS, 
  MOCK_STUDENTS, 
  StudentProfile, 
  Transaction 
} from '../data/mockData';
import { formatINR, formatNumberIN, truncateHash } from '../utils/format';
import { DonorChart } from '../components/sections/DonorChart';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { WalletVerificationModal } from '../components/modals/WalletVerificationModal';
import { type OnChainTransactionResult } from '../midnight/contract';
import { 
  Building2, 
  Download, 
  ShieldCheck, 
  Users, 
  Coins, 
  Activity, 
  FileCheck, 
  Search, 
  CheckCircle2, 
  ExternalLink,
  PlusCircle,
  Sparkles
} from 'lucide-react';

export const DonorDashboard: React.FC = () => {
  const { currentDonor, showToast, transactions, addTransaction, walletAddress } = useWallet();
  const [beneficiarySearch, setBeneficiarySearch] = useState('');
  const [selectedStudentDrilldown, setSelectedStudentDrilldown] = useState<StudentProfile | null>(null);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isVerifyingWithWallet, setIsVerifyingWithWallet] = useState(false);
  const [depositAmount, setDepositAmount] = useState<number>(50000);
  const [selectedProgram, setSelectedProgram] = useState<string>('NextGen Engineering 500');
  const [lastDepositResult, setLastDepositResult] = useState<OnChainTransactionResult | null>(null);

  // Beneficiaries filter
  const filteredStudents = MOCK_STUDENTS.filter((s) => {
    if (!beneficiarySearch) return true;
    const term = beneficiarySearch.toLowerCase();
    return (
      s.anonymizedId.toLowerCase().includes(term) ||
      s.name.toLowerCase().includes(term) ||
      s.college.toLowerCase().includes(term) ||
      s.programName.toLowerCase().includes(term)
    );
  });

  const handleDepositConfirm = async (result?: OnChainTransactionResult) => {
    setIsVerifyingWithWallet(false);
    if (!result) return;

    setLastDepositResult(result);
    currentDonor.totalContributed += depositAmount;

    const newTx: Transaction = {
      id: `tx-dep-${Date.now()}`,
      hash: result.txHash,
      fromName: currentDonor.name,
      fromAddress: walletAddress || 'mn_addr_preprod1cas900z8s709cja2k93a27lnz8z6l2cvfwxerwtlfzqt6fv3p3vqcx4d4j',
      toName: 'EduFund Treasury Pool',
      toAddress: '0xd5ea58d1702899641495e5a879bd1696dadc611fd72c965351b7cabe3af0fbf3',
      category: 'Grant Capital',
      amount: depositAmount,
      status: 'Verified On-Chain',
      timestamp: 'Just now',
      blockNumber: result.blockNumber,
      programId: selectedProgram,
      purpose: `CSR Endowment to ${selectedProgram}`,
    };
    addTransaction(newTx);
    showToast(`Successfully deposited ${formatINR(depositAmount)} to scholarship pool on Midnight Preprod!`);
  };

  const handleDownloadReport = () => {
    showToast('Statutory CSR-1 On-Chain Audit Report downloaded (CSV format).');
    const csvContent = "data:text/csv;charset=utf-8,ID,College,Amount,Status,VerifiedOnChain\n" +
      MOCK_STUDENTS.map(s => `${s.anonymizedId},"${s.college}",${s.totalGrant},${s.statusLabel},TRUE`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `edufund_audit_report_${currentDonor.name.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Recent live activity feed items from live on-chain ledger
  const liveActivities = transactions.filter(t => t.status === 'Verified On-Chain').slice(0, 5);

  return (
    <div className="min-h-screen bg-[#F5F7FF] pb-24 transition-colors">
      {/* Top Banner */}
      <section className="bg-[#0B1240] text-white py-12 border-b-4 border-[#14F5B0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#1F2BFF] flex items-center justify-center text-3xl shadow-lg font-bold">
              {currentDonor.logo}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#14F5B0] bg-white/10 px-2.5 py-0.5 rounded-full">
                  {currentDonor.type}
                </span>
                <span className="text-xs text-[#C8F560] font-semibold">
                  Verified Spend Rate: {currentDonor.verifiedSpendRate}%
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-sans">
                {currentDonor.name} CSR Portal
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                {currentDonor.storyHeadline} — 100% purpose-locked accountability.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="mint"
              size="md"
              icon={<Download className="w-4 h-4 text-[#0B1240]" />}
              onClick={handleDownloadReport}
            >
              Download Audit Report
            </Button>
            <Button
              variant="neo-lime"
              size="md"
              icon={<Coins className="w-4 h-4 text-[#0B1240]" />}
              onClick={() => setIsDepositModalOpen(true)}
            >
              Deposit to Pool
            </Button>
          </div>
        </div>
      </section>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        {/* KPI Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-[20px] bg-white border border-slate-200 shadow-soft">
            <span className="text-xs text-slate-500 font-semibold block mb-1">Total Grant Capital</span>
            <div className="text-2xl font-display uppercase tracking-wide text-[#0B1240]">
              {formatINR(currentDonor.totalContributed)}
            </div>
            <div className="text-[11px] text-[#00A651] font-semibold mt-1">₹10,00,000 for 500 scholars</div>
          </div>

          <div className="p-5 rounded-[20px] bg-white border border-slate-200 shadow-soft">
            <span className="text-xs text-slate-500 font-semibold block mb-1">Scholars Sponsored</span>
            <div className="text-2xl font-display uppercase tracking-wide text-[#1F2BFF]">
              {formatNumberIN(currentDonor.studentsSponsored)} Students
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Engineering undergraduates</div>
          </div>

          <div className="p-5 rounded-[20px] bg-white border border-slate-200 shadow-soft">
            <span className="text-xs text-slate-500 font-semibold block mb-1">On-Chain Verified Rate</span>
            <div className="text-2xl font-display uppercase tracking-wide text-[#00A651]">
              {currentDonor.verifiedSpendRate}%
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Zero non-education leakages</div>
          </div>

          <div className="p-5 rounded-[20px] bg-white border border-slate-200 shadow-soft">
            <span className="text-xs text-slate-500 font-semibold block mb-1">Active Programs</span>
            <div className="text-2xl font-display uppercase tracking-wide text-amber-600">
              {currentDonor.activeProgramsCount} Flagship Pool
            </div>
            <div className="text-[11px] text-slate-400 mt-1">NextGen Engineering 500</div>
          </div>
        </div>

        {/* Recharts Analytics Component */}
        <DonorChart donor={currentDonor} />

        {/* Live Activity Feed strip */}
        <div className="bg-white rounded-[24px] border border-slate-200 p-6 shadow-soft space-y-3">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#1F2BFF]" />
            <h3 className="text-base font-bold text-[#0B1240]">
              Live Merchant Redemption Activity Feed
            </h3>
            <span className="text-xs font-mono text-[#00A651] bg-[#00A651]/10 px-2.5 py-0.5 rounded-full font-bold ml-auto">
              Real-Time Pulse
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {liveActivities.map((act) => (
              <div key={act.id} className="py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#14F5B0]" />
                  <span className="font-semibold text-slate-800">
                    Token {formatINR(act.amount)} spent at <strong>{act.toName}</strong>
                  </span>
                  <span className="text-slate-400">({act.category})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-slate-400 text-[11px]">{truncateHash(act.hash, 4, 4)}</span>
                  <Badge variant="mint">Verified • 100%</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Searchable Beneficiaries Table */}
        <div className="bg-white rounded-[24px] border border-slate-200 shadow-soft p-6 sm:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-xl font-bold font-sans text-[#0B1240]">
                Beneficiary Scholars (Anonymized Roster)
              </h3>
              <p className="text-xs text-slate-500">
                Click any student row to drill down into their on-chain merchant receipts
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search ID, college, or name..."
                value={beneficiarySearch}
                onChange={(e) => setBeneficiarySearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:border-[#1F2BFF]"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px] font-bold">
                  <th className="py-3 px-4">Student ID</th>
                  <th className="py-3 px-4">Beneficiary Name</th>
                  <th className="py-3 px-4">College / University</th>
                  <th className="py-3 px-4">Grant Pool</th>
                  <th className="py-3 px-4 text-right">Total Allotted</th>
                  <th className="py-3 px-4 text-right">Spent to Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-center">Drill-Down</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((s) => (
                  <tr
                    key={s.id}
                    onClick={() => setSelectedStudentDrilldown(s)}
                    className="hover:bg-blue-50/50 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-4 font-mono font-bold text-[#1F2BFF]">
                      {s.anonymizedId}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800">
                      {s.name}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {s.college}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {s.programName}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-[#0B1240]">
                      {formatINR(s.totalGrant)}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-[#00A651]">
                      {formatINR(s.spentAmount)}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="mint">
                        {s.statusLabel}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedStudentDrilldown(s);
                        }}
                        className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-[#1F2BFF] hover:text-white text-xs font-bold text-slate-700 transition-colors"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Per-Student Drilldown Modal */}
      {selectedStudentDrilldown && (
        <Modal
          isOpen={Boolean(selectedStudentDrilldown)}
          onClose={() => setSelectedStudentDrilldown(null)}
          title={`Audit Breakdown: ${selectedStudentDrilldown.anonymizedId}`}
          subtitle={`${selectedStudentDrilldown.name} • ${selectedStudentDrilldown.college}`}
          maxWidth="lg"
        >
          <div className="space-y-5">
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <div>
                <span className="text-slate-400 block">Total Grant:</span>
                <span className="font-bold text-[#0B1240] text-sm">{formatINR(selectedStudentDrilldown.totalGrant)}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Verified Spent:</span>
                <span className="font-bold text-[#00A651] text-sm">{formatINR(selectedStudentDrilldown.spentAmount)}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Remaining:</span>
                <span className="font-bold text-amber-600 text-sm">{formatINR(selectedStudentDrilldown.remainingTokens)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Purpose Bucket Breakdown:
              </h5>
              <div className="space-y-2">
                {selectedStudentDrilldown.buckets.map((b, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-[#0B1240] block">{b.category}</span>
                      <span className="text-[11px] text-slate-500">{b.note}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-[#00A651]">{formatINR(b.spent)}</span>
                      <span className="text-slate-400"> / {formatINR(b.allocated)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-100 text-xs font-mono flex items-center justify-between text-slate-600 border border-transparent">
              <span>Public Nullifier Commitment:</span>
              <span className="font-bold text-[#1F2BFF]">0xnull_9921bfa00129</span>
            </div>

            <Button
              variant="primary"
              size="md"
              className="w-full"
              onClick={() => setSelectedStudentDrilldown(null)}
            >
              Close Breakdown
            </Button>
          </div>
        </Modal>
      )}

      {/* Deposit to Scholarship Pool Modal */}
      <Modal
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
        title="Contribute Grant Capital to Pool"
        subtitle="Lock liquidity into the EduFund smart contract treasury on Midnight Preprod"
        maxWidth="md"
      >
        <div className="space-y-5">
          {/* Program Select */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Select Target Scholarship Program
            </label>
            <select
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-semibold text-sm text-[#0B1240] focus:border-[#1F2BFF]"
            >
              <option value="NextGen Engineering 500">NextGen Engineering 500 (Tier-1 Pool)</option>
              <option value="Women in STEM 2026">Women in STEM 2026 (Tech & Labs)</option>
              <option value="Digital Bharat Scholars">Digital Bharat Scholars (Rural Access)</option>
              <option value="Medical & Healthcare Fellowship">Medical & Healthcare Fellowship</option>
            </select>
          </div>

          {/* Amount Presets */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Contribution Amount
            </label>
            <div className="grid grid-cols-4 gap-2 mb-3">
              {[25000, 50000, 100000, 250000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setDepositAmount(amt)}
                  className={`py-2 px-1 text-xs font-bold rounded-xl border transition-all ${
                    depositAmount === amt
                      ? 'bg-[#1F2BFF] text-white border-[#1F2BFF] shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {formatINR(amt)}
                </button>
              ))}
            </div>

            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-sm font-bold text-slate-400">₹</span>
              <input
                type="number"
                min="1000"
                step="1000"
                value={depositAmount}
                onChange={(e) => setDepositAmount(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 font-bold text-base text-[#0B1240] focus:border-[#1F2BFF]"
              />
              <span className="absolute right-3.5 top-2.5 text-xs font-mono text-slate-400">
                ≈ {(depositAmount / 100).toFixed(0)} tNIGHT
              </span>
            </div>
          </div>

          {/* Treasury Escrow Details */}
          <div className="p-4 rounded-2xl bg-[#0B1240] text-white space-y-2 border-2 border-[#14F5B0]/40">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#14F5B0] font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#14F5B0]" />
                Target Midnight Smart Contract:
              </span>
              <span className="font-mono text-[10px] text-slate-300">Preprod Testnet</span>
            </div>
            <div className="font-mono text-[11px] text-[#14F5B0] bg-white/10 p-2 rounded-lg break-all">
              0xd5ea58d1702899641495e5a879bd1696dadc611fd72c965351b7cabe3af0fbf3
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed pt-1">
              Funds are programmatically locked into escrow. They can only be released to accredited educational merchants when a student generates a valid zero-knowledge proof.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <Button
              variant="outline"
              size="md"
              className="flex-1"
              onClick={() => setIsDepositModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="mint"
              size="md"
              className="flex-1 font-bold text-[#0B1240]"
              onClick={() => {
                setIsDepositModalOpen(false);
                setIsVerifyingWithWallet(true);
              }}
              icon={<ShieldCheck className="w-4 h-4 text-[#0B1240]" />}
            >
              Verify with Wallet
            </Button>
          </div>
        </div>
      </Modal>

      {/* Wallet Verification On-Chain Popup */}
      <WalletVerificationModal
        isOpen={isVerifyingWithWallet}
        onClose={() => setIsVerifyingWithWallet(false)}
        onConfirm={handleDepositConfirm}
        transactionTitle="CSR Grant Capital Injection"
        programOrMerchantName={selectedProgram}
        amount={depositAmount}
        circuitName="depositPool"
        details={[
          { label: 'Pool Program', value: selectedProgram },
          { label: 'Settlement Token', value: 'tNIGHT (Midnight Preprod)' },
          { label: 'Escrow Lock', value: '100% Purpose-Restricted' },
        ]}
      />

      {/* Deposit Success Modal with Explorer Link */}
      {lastDepositResult && (
        <Modal
          isOpen={Boolean(lastDepositResult)}
          onClose={() => setLastDepositResult(null)}
          title="On-Chain Deposit Verified!"
          subtitle="Your capital has been committed to the Midnight Preprod smart contract"
          maxWidth="md"
        >
          <div className="space-y-5 text-center py-2">
            <div className="w-16 h-16 rounded-full bg-[#14F5B0]/20 border-2 border-[#14F5B0] text-[#008A5E] flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <div className="text-2xl font-bold font-sans text-[#0B1240]">
                {formatINR(depositAmount)} Deposited
              </div>
              <div className="text-xs text-slate-500 font-medium">
                Allocated to <strong>{selectedProgram}</strong>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-left space-y-2 font-mono">
              <div className="flex justify-between items-center text-slate-600">
                <span>Extrinsic Hash:</span>
                <span className="font-bold text-[#1F2BFF]">
                  {truncateHash(lastDepositResult.txHash, 8, 6)}
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>Block Number:</span>
                <span className="font-bold text-[#0B1240]">#{lastDepositResult.blockNumber}</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>Gas Fee:</span>
                <span className="text-green-600 font-bold">{lastDepositResult.gasFee}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://midnight-preprod.subscan.io/extrinsic/${lastDepositResult.txHash}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 px-4 rounded-full bg-[#0B1240] hover:bg-[#1F2BFF] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <span>View on Midnight Subscan</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <Button
                variant="neo-lime"
                size="md"
                className="flex-1 font-bold"
                onClick={() => setLastDepositResult(null)}
              >
                Done
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
