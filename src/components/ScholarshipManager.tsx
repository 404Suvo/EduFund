import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Eye,
  EyeOff,
  Coins,
  GraduationCap,
  Building2,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  RefreshCw,
  PlusCircle,
  ArrowRight,
  School,
  BookOpen,
} from 'lucide-react';
import { contractService, type EduFundLedgerState, type Merchant, type ZKProofStep } from '../utils/contract';

interface Props {
  userRole: 'student' | 'donor' | 'admin';
}

export const ScholarshipManager: React.FC<Props> = ({ userRole }) => {
  const [ledgerState, setLedgerState] = useState<EduFundLedgerState>(contractService.getLedgerState());
  const [selectedMerchantId, setSelectedMerchantId] = useState<string>('merch_01');
  const [voucherCode, setVoucherCode] = useState<string>('EDUFUND-STEM-GRANT-2026-X89');
  const [voucherAmount, setVoucherAmount] = useState<number>(25000);

  // Student Redemption State
  const [isProving, setIsProving] = useState<boolean>(false);
  const [proofSteps, setProofSteps] = useState<ZKProofStep[]>([]);
  const [lastTxHash, setLastTxHash] = useState<string | null>(null);
  const [lastNullifier, setLastNullifier] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Donor Pool State
  const [depositAmount, setDepositAmount] = useState<number>(100000);
  const [isDepositing, setIsDepositing] = useState<boolean>(false);
  const [depositSuccessMsg, setDepositSuccessMsg] = useState<string | null>(null);

  // Admin Merchant Registration State
  const [newMerchantName, setNewMerchantName] = useState<string>('');
  const [newMerchantCategory, setNewMerchantCategory] = useState<Merchant['category']>('University');
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  const refreshLedger = () => {
    setLedgerState(contractService.getLedgerState());
  };

  const handleRedeemGrant = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProving(true);
    setErrorMessage(null);
    setLastTxHash(null);
    setLastNullifier(null);
    setProofSteps([]);

    try {
      const result = await contractService.redeemGrant(
        voucherCode,
        selectedMerchantId,
        BigInt(voucherAmount),
        (idx, step) => {
          setProofSteps((prev) => {
            const next = [...prev];
            next[idx] = { ...step };
            return next;
          });
        }
      );
      setLastTxHash(result.txHash);
      setLastNullifier(result.nullifier);
      refreshLedger();
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err?.message || 'Transaction failed');
    } finally {
      setIsProving(false);
    }
  };

  const handleDepositPool = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDepositing(true);
    setDepositSuccessMsg(null);
    setErrorMessage(null);

    try {
      const res = await contractService.depositPool(BigInt(depositAmount));
      setDepositSuccessMsg(`Successfully contributed ${depositAmount.toLocaleString()} tNIGHT to pool! Tx: ${res.txHash}`);
      refreshLedger();
    } catch (err: any) {
      setErrorMessage(err?.message || 'Deposit failed');
    } finally {
      setIsDepositing(false);
    }
  };

  const handleRegisterMerchant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMerchantName.trim()) return;
    setIsRegistering(true);
    setErrorMessage(null);

    try {
      await contractService.registerMerchant(newMerchantName, newMerchantCategory);
      setNewMerchantName('');
      refreshLedger();
    } catch (err: any) {
      setErrorMessage(err?.message || 'Merchant registration failed');
    } finally {
      setIsRegistering(false);
    }
  };

  const handleToggleMerchant = async (id: string) => {
    try {
      await contractService.toggleMerchantStatus(id);
      refreshLedger();
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to update merchant');
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* ═══════════════════════════════════════════════════
          TOP BANNER: Global Pool Statistics (White Cards, 18px radius, Soft Shadow)
         ═══════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[18px] border border-slate-200/80 shadow-educhain-soft hover:shadow-educhain-hover transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Scholarship Pool</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1F2BFF] flex items-center justify-center">
              <Coins className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#0B0F3B] font-mono tracking-tight">
              {Number(ledgerState.totalPool).toLocaleString()}
            </span>
            <span className="text-xs text-[#1F2BFF] font-bold">tNIGHT</span>
          </div>
          <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Verified on Midnight Preprod</span>
          </p>
        </div>

        <div className="bg-white p-6 rounded-[18px] border border-slate-200/80 shadow-educhain-soft hover:shadow-educhain-hover transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Disbursed to Merchants</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#0B0F3B] font-mono tracking-tight">
              {Number(ledgerState.totalDisbursed).toLocaleString()}
            </span>
            <span className="text-xs text-emerald-600 font-bold">tNIGHT</span>
          </div>
          <p className="text-xs text-slate-400 mt-1.5">100% purpose-restricted to education</p>
        </div>

        <div className="bg-white p-6 rounded-[18px] border border-slate-200/80 shadow-educhain-soft hover:shadow-educhain-hover transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Accredited Merchants</span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#0B0F3B] font-mono tracking-tight">
              {ledgerState.merchants.filter((m) => m.isApproved).length}
            </span>
            <span className="text-xs text-purple-600 font-bold">Institutions</span>
          </div>
          <p className="text-xs text-slate-400 mt-1.5">{ledgerState.spentNullifiers.length} Vouchers Anonymously Settled</p>
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-[16px] bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3 shadow-sm">
          <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
          <div className="text-sm">
            <strong className="font-bold block">Circuit Assertion Error</strong>
            <span>{errorMessage}</span>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════
          STUDENT PORTAL: EduChain Hero & Cards Visual Style
         ═══════════════════════════════════════════════════ */}
      {userRole === 'student' && (
        <div className="space-y-8">
          {/* Hero Banner: Full-Width Royal Blue with Isometric Grid Pattern */}
          <div className="relative rounded-[22px] bg-educhain-hero text-white p-8 sm:p-10 shadow-xl overflow-hidden">
            {/* Glowing Accent Dots */}
            <div className="absolute top-6 left-12 w-3 h-3 rounded-full bg-[#00F0B5] blur-[1px] animate-pulse"></div>
            <div className="absolute top-1/2 right-1/4 w-2.5 h-2.5 rounded-full bg-amber-400 blur-[1px]"></div>
            <div className="absolute bottom-8 left-1/3 w-3 h-3 rounded-full bg-purple-400 blur-[1px]"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#00F0B5] text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-[#00F0B5]" />
                  <span>ZK Shield Active</span>
                </div>

                {/* Big Uppercase Headline in Neon Teal-Green */}
                <h1 className="text-3xl sm:text-5xl font-black font-display tracking-wider uppercase text-[#00F0B5] leading-none">
                  Zero-Knowledge Grant Redemption
                </h1>

                {/* White Subheading */}
                <p className="text-sm sm:text-base text-white/95 max-w-2xl font-normal leading-relaxed">
                  Prove grant validity & spend only at approved vendors without revealing your identity.
                </p>
              </div>

              {/* Floating Tilted 3D Isometric Tile Placeholder */}
              <div className="lg:col-span-4 hidden lg:flex justify-end perspective-1000">
                <div className="w-44 h-44 rounded-[20px] bg-white/95 backdrop-blur-md p-5 border border-white/40 shadow-2xl text-[#0B0F3B] tile-isometric animate-float-slow flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#1F2BFF] text-white flex items-center justify-center font-bold">
                      <GraduationCap className="w-6 h-6 text-[#00F0B5]" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Active
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0B0F3B]">Private Voucher</div>
                    <div className="text-[11px] font-mono text-[#1F2BFF] font-semibold mt-0.5">25,000 tNIGHT</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form & Privacy Inspector Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Grant Redemption Form Card */}
            <div className="lg:col-span-7 bg-white p-7 sm:p-9 rounded-[20px] border border-slate-200/80 shadow-educhain-soft">
              <form onSubmit={handleRedeemGrant} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2 flex items-center justify-between">
                    <span>Private Scholarship Voucher Code</span>
                    <span className="text-xs text-amber-600 font-bold flex items-center gap-1 font-mono">
                      <Lock className="w-3.5 h-3.5" /> Stays 100% Client-Side
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={voucherCode}
                      onChange={(e) => setVoucherCode(e.target.value)}
                      required
                      placeholder="e.g. EDUFUND-STEM-GRANT-2026-X89"
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0B0F3B] font-mono text-sm focus:outline-none focus:bg-white focus:border-[#1F2BFF] focus:ring-2 focus:ring-[#1F2BFF]/20 transition-all"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1.5">
                    Your private voucher code is hashed with a local secret witness. It is NEVER broadcasted on-chain.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                      Redemption Amount (tNIGHT)
                    </label>
                    <input
                      type="number"
                      value={voucherAmount}
                      onChange={(e) => setVoucherAmount(Number(e.target.value))}
                      min="1"
                      max="100000"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-[#0B0F3B] font-mono text-sm focus:outline-none focus:bg-white focus:border-[#1F2BFF] focus:ring-2 focus:ring-[#1F2BFF]/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                      Select Accredited Education Merchant
                    </label>
                    <select
                      value={selectedMerchantId}
                      onChange={(e) => setSelectedMerchantId(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-[#0B0F3B] text-sm font-medium focus:outline-none focus:bg-white focus:border-[#1F2BFF] focus:ring-2 focus:ring-[#1F2BFF]/20 transition-all"
                    >
                      {ledgerState.merchants.map((m) => (
                        <option key={m.id} value={m.id} disabled={!m.isApproved}>
                          {m.name} ({m.category}) {!m.isApproved ? '[SUSPENDED]' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Primary Full-Width Blue Button with Arrow Nudge */}
                <button
                  type="submit"
                  disabled={isProving}
                  className="w-full py-4 rounded-xl bg-[#1F2BFF] hover:bg-[#1A22CC] text-white font-bold text-sm shadow-md shadow-[#1F2BFF]/25 hover:shadow-lg hover:shadow-[#1F2BFF]/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 flex items-center justify-center gap-2 group"
                >
                  {isProving ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-white" />
                      <span>Synthesizing Compact Zero-Knowledge Proof...</span>
                    </>
                  ) : (
                    <>
                      <span>Generate ZK Proof & Redeem to Merchant</span>
                      <ArrowRight className="w-4 h-4 text-[#00F0B5] transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>

              {/* Proof Execution Pipeline */}
              {proofSteps.length > 0 && (
                <div className="mt-8 pt-6 border-t border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F2BFF]">
                    Zero-Knowledge Proof Circuit Pipeline
                  </h4>
                  <div className="space-y-2.5">
                    {proofSteps.map((step, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs"
                      >
                        {step.status === 'completed' ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        ) : step.status === 'in_progress' ? (
                          <RefreshCw className="w-4 h-4 text-[#1F2BFF] animate-spin shrink-0 mt-0.5" />
                        ) : step.status === 'failed' ? (
                          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        ) : (
                          <span className="w-4 h-4 rounded-full border border-slate-300 shrink-0 mt-0.5"></span>
                        )}
                        <div>
                          <div className="font-bold text-[#0B0F3B]">{step.title}</div>
                          <div className="text-slate-500 text-[11px] mt-0.5">{step.detail}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {lastTxHash && (
                <div className="mt-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1 text-xs">
                  <div className="font-bold flex items-center gap-1.5 text-emerald-700">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Grant Redeemed Successfully on Midnight Preprod!</span>
                  </div>
                  <div className="font-mono text-[11px] text-slate-700 break-all">
                    Tx Hash: <span className="text-[#1F2BFF] font-semibold">{lastTxHash}</span>
                  </div>
                  <div className="font-mono text-[11px] text-slate-700 break-all">
                    Recorded Nullifier: <span className="text-emerald-700 font-semibold">{lastNullifier}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Privacy Shield Inspector & Merchants Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-6 sm:p-7 rounded-[20px] border border-slate-200/80 shadow-educhain-soft">
                <div className="flex items-center gap-2 mb-3">
                  <Lock className="w-4 h-4 text-[#1F2BFF]" />
                  <h3 className="text-xs font-bold text-[#0B0F3B] uppercase tracking-wider">Privacy Model Inspector</h3>
                </div>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                  Midnight's dual-state engine splits public verification from private data. Here is exactly what is kept private vs. what is published:
                </p>

                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-800 mb-1">
                      <Eye className="w-3.5 h-3.5 text-emerald-600" />
                      <span>PUBLIC ON-CHAIN LEDGER:</span>
                    </div>
                    <ul className="list-disc list-inside text-slate-700 space-y-0.5 text-[11px]">
                      <li>Target Merchant Public Key</li>
                      <li>Redeemed Grant Value (tNIGHT)</li>
                      <li>Voucher Nullifier Hash (prevents double claims)</li>
                      <li>Valid Zero-Knowledge Proof Signature</li>
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200">
                    <div className="flex items-center gap-1.5 font-bold text-[#1F2BFF] mb-1">
                      <EyeOff className="w-3.5 h-3.5 text-[#1F2BFF]" />
                      <span>PRIVATE (NEVER ON-CHAIN):</span>
                    </div>
                    <ul className="list-disc list-inside text-slate-700 space-y-0.5 text-[11px]">
                      <li>Student Name & Real-World Identity</li>
                      <li>Student National ID / Roll Number</li>
                      <li>Student Wallet Address / Financial History</li>
                      <li>Raw Grant Voucher Secret & Salt</li>
                      <li>Academic Transcript & Eligibility Data</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Approved Merchants Directory Card */}
              <div className="bg-white p-6 sm:p-7 rounded-[20px] border border-slate-200/80 shadow-educhain-soft">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">Approved Merchant List</h4>
                  <span className="text-[11px] text-[#1F2BFF] font-semibold bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                    Purpose-Restricted
                  </span>
                </div>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1 text-xs">
                  {ledgerState.merchants.map((m) => (
                    <div
                      key={m.id}
                      className={`p-3 rounded-xl border flex items-center justify-between ${
                        m.isApproved
                          ? 'bg-slate-50/80 border-slate-200'
                          : 'bg-rose-50/50 border-rose-200 opacity-60'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-[#0B0F3B] text-[12px]">{m.name}</div>
                        <div className="text-[11px] text-slate-500">{m.category}</div>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          m.isApproved ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {m.isApproved ? 'Approved' : 'Inactive'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════
          DONOR PORTAL: Clean White Cards with Soft Shadow
         ═══════════════════════════════════════════════════ */}
      {userRole === 'donor' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 bg-white p-7 sm:p-9 rounded-[20px] border border-slate-200/80 shadow-educhain-soft space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-50 text-[#1F2BFF]">
                <Coins className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#0B0F3B]">Contribute to Scholarship Pool</h2>
                <p className="text-xs text-slate-500">
                  Fund educational grants directly to the smart contract with purpose-specific settlement guarantees.
                </p>
              </div>
            </div>

            <form onSubmit={handleDepositPool} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Deposit Amount (tNIGHT)
                </label>
                <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(Number(e.target.value))}
                  min="1000"
                  step="1000"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-[#0B0F3B] font-mono text-sm focus:outline-none focus:bg-white focus:border-[#1F2BFF] focus:ring-2 focus:ring-[#1F2BFF]/20"
                />
              </div>

              <button
                type="submit"
                disabled={isDepositing}
                className="w-full py-4 rounded-xl bg-[#1F2BFF] hover:bg-[#1A22CC] text-white font-bold text-sm shadow-md shadow-[#1F2BFF]/25 hover:shadow-lg hover:shadow-[#1F2BFF]/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isDepositing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Broadcasting deposit circuit call...</span>
                  </>
                ) : (
                  <>
                    <PlusCircle className="w-4 h-4 text-[#00F0B5]" />
                    <span>Deposit into Scholarship Treasury</span>
                  </>
                )}
              </button>
            </form>

            {depositSuccessMsg && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono">
                {depositSuccessMsg}
              </div>
            )}

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5 leading-relaxed">
              <strong className="text-[#0B0F3B] block font-bold">Donor Auditability Guarantee:</strong>
              <p>
                Unlike traditional non-profit donations where funds disappear into bureaucratic intermediaries,
                EduFund smart contracts mathematically prevent funds from being redeemed anywhere except approved
                educational institutions.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white p-7 sm:p-9 rounded-[20px] border border-slate-200/80 shadow-educhain-soft space-y-4">
            <h3 className="text-xs font-bold text-[#0B0F3B] uppercase tracking-wider">Merchant Disbursement Audit</h3>
            <p className="text-xs text-slate-500">
              Real-time on-chain accounting of all redeemed grants across registered educational providers:
            </p>

            <div className="space-y-3 pt-2">
              {ledgerState.merchants.map((m) => (
                <div key={m.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-[#0B0F3B]">{m.name}</div>
                    <div className="text-[11px] text-slate-500">{m.category}</div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-[#1F2BFF] text-sm">
                      {Number(m.totalRedeemed).toLocaleString()} tNIGHT
                    </span>
                    <span className="block text-[10px] text-slate-400">Settled to date</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════
          ADMIN PORTAL: Accreditation & Registry Management
         ═══════════════════════════════════════════════════ */}
      {userRole === 'admin' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 bg-white p-7 sm:p-9 rounded-[20px] border border-slate-200/80 shadow-educhain-soft space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#0B0F3B]">Accredit Educational Merchant</h2>
                <p className="text-xs text-slate-500">
                  Register universities, STEM equipment suppliers, and verified course providers.
                </p>
              </div>
            </div>

            <form onSubmit={handleRegisterMerchant} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Institution / Vendor Name
                </label>
                <input
                  type="text"
                  value={newMerchantName}
                  onChange={(e) => setNewMerchantName(e.target.value)}
                  placeholder="e.g. City Tech University Bookstore"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-[#0B0F3B] text-sm focus:outline-none focus:bg-white focus:border-[#1F2BFF] focus:ring-2 focus:ring-[#1F2BFF]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Category
                </label>
                <select
                  value={newMerchantCategory}
                  onChange={(e) => setNewMerchantCategory(e.target.value as any)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-[#0B0F3B] text-sm focus:outline-none focus:bg-white focus:border-[#1F2BFF] focus:ring-2 focus:ring-[#1F2BFF]/20 font-medium"
                >
                  <option value="University">University / Tuition</option>
                  <option value="Bookstore">Academic Bookstore</option>
                  <option value="Lab Equipment">Lab & Hardware Equipment</option>
                  <option value="Online Learning">Accredited Online Course</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isRegistering}
                className="w-full py-4 rounded-xl bg-[#1F2BFF] hover:bg-[#1A22CC] text-white font-bold text-sm shadow-md shadow-[#1F2BFF]/25 hover:shadow-lg hover:shadow-[#1F2BFF]/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isRegistering ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Signing circuit with Admin Witness...</span>
                  </>
                ) : (
                  <>
                    <PlusCircle className="w-4 h-4 text-[#00F0B5]" />
                    <span>Accredit Merchant</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 bg-white p-7 sm:p-9 rounded-[20px] border border-slate-200/80 shadow-educhain-soft space-y-4">
            <h3 className="text-xs font-bold text-[#0B0F3B] uppercase tracking-wider">Merchant Accreditation Registry</h3>
            <p className="text-xs text-slate-500">
              Only merchants in this on-chain registry can accept and settle EduFund grant vouchers.
            </p>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-1 pt-2">
              {ledgerState.merchants.map((m) => (
                <div
                  key={m.id}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-[#0B0F3B] text-sm">{m.name}</div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                      <span>{m.category}</span>
                      <span>•</span>
                      <span className="font-mono text-slate-400">{m.publicKeyHex.slice(0, 16)}...</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                        m.isApproved
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {m.isApproved ? 'Active' : 'Suspended'}
                    </span>
                    <button
                      onClick={() => handleToggleMerchant(m.id)}
                      className="px-3 py-1 text-[11px] font-semibold rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-[#0B0F3B] shadow-sm transition-colors"
                    >
                      {m.isApproved ? 'Suspend' : 'Reactivate'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
