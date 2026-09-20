import React, { useState, useEffect } from 'react';
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
  ArrowRight,
  Sparkles,
  RefreshCw,
  FileCheck,
  PlusCircle,
  ExternalLink,
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
    <div className="space-y-8">
      {/* Top Banner: Global Pool Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl"></div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Total Scholarship Pool</span>
            <Coins className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white font-mono">
              {Number(ledgerState.totalPool).toLocaleString()}
            </span>
            <span className="text-xs text-cyan-400 font-semibold">tNIGHT</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Verified on Midnight Preprod</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl"></div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Total Disbursed to Merchants</span>
            <GraduationCap className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white font-mono">
              {Number(ledgerState.totalDisbursed).toLocaleString()}
            </span>
            <span className="text-xs text-emerald-400 font-semibold">tNIGHT</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">100% purpose-restricted to education</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl"></div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Accredited Merchants</span>
            <Building2 className="w-5 h-5 text-purple-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white font-mono">
              {ledgerState.merchants.filter((m) => m.isApproved).length}
            </span>
            <span className="text-xs text-purple-400 font-semibold">Institutions</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">{ledgerState.spentNullifiers.length} Vouchers Anonymously Settled</p>
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="text-sm">
            <strong className="font-semibold block">Circuit Assertion Error</strong>
            <span>{errorMessage}</span>
          </div>
        </div>
      )}

      {/* STUDENT PORTAL: Central Privacy Feature */}
      {userRole === 'student' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Grant Redemption Form */}
          <div className="lg:col-span-7 glass-panel-accent p-6 md:p-8 rounded-2xl border border-cyan-500/30">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Zero-Knowledge Grant Redemption</h2>
                  <p className="text-xs text-slate-400">
                    Prove grant validity & spend only at approved vendors without revealing your identity.
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/40">
                ZK Shield Active
              </span>
            </div>

            <form onSubmit={handleRedeemGrant} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>Private Scholarship Voucher Code</span>
                  <span className="text-[11px] text-amber-400 flex items-center gap-1 font-mono">
                    <Lock className="w-3 h-3" /> Stays 100% Client-Side
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                    required
                    placeholder="e.g. EDUFUND-STEM-GRANT-2026-X89"
                    className="w-full px-4 py-3 rounded-xl bg-midnight-900/90 border border-slate-700/80 text-white font-mono text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Your private voucher code is hashed with a local secret witness. It is NEVER broadcasted on-chain.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Redemption Amount (tNIGHT)
                  </label>
                  <input
                    type="number"
                    value={voucherAmount}
                    onChange={(e) => setVoucherAmount(Number(e.target.value))}
                    min="1"
                    max="100000"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-midnight-900/90 border border-slate-700/80 text-white font-mono text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Select Accredited Education Merchant
                  </label>
                  <select
                    value={selectedMerchantId}
                    onChange={(e) => setSelectedMerchantId(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-midnight-900/90 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  >
                    {ledgerState.merchants.map((m) => (
                      <option key={m.id} value={m.id} disabled={!m.isApproved}>
                        {m.name} ({m.category}) {!m.isApproved ? '[SUSPENDED]' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProving}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-xl shadow-cyan-500/20 transition-all transform active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isProving ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Synthesizing Compact Zero-Knowledge Proof...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-cyan-200" />
                    <span>Generate ZK Proof & Redeem to Merchant</span>
                  </>
                )}
              </button>
            </form>

            {/* Proof Execution Pipeline */}
            {proofSteps.length > 0 && (
              <div className="mt-6 pt-6 border-t border-slate-800 space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                  Zero-Knowledge Proof Circuit Pipeline
                </h4>
                <div className="space-y-2.5">
                  {proofSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-midnight-900/60 border border-slate-800 flex items-start gap-3 text-xs"
                    >
                      {step.status === 'completed' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      ) : step.status === 'in_progress' ? (
                        <RefreshCw className="w-4 h-4 text-cyan-400 animate-spin shrink-0 mt-0.5" />
                      ) : step.status === 'failed' ? (
                        <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      ) : (
                        <span className="w-4 h-4 rounded-full border border-slate-600 shrink-0 mt-0.5"></span>
                      )}
                      <div>
                        <div className="font-semibold text-white">{step.title}</div>
                        <div className="text-slate-400 text-[11px] mt-0.5">{step.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {lastTxHash && (
              <div className="mt-6 p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 space-y-1 text-xs">
                <div className="font-semibold flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Grant Redeemed Successfully on Midnight Preprod!</span>
                </div>
                <div className="font-mono text-[11px] text-slate-300 break-all">
                  Tx Hash: <span className="text-cyan-400">{lastTxHash}</span>
                </div>
                <div className="font-mono text-[11px] text-slate-300 break-all">
                  Recorded Nullifier: <span className="text-emerald-400">{lastNullifier}</span>
                </div>
              </div>
            )}
          </div>

          {/* Privacy Shield Inspector */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2 mb-4">
                <Lock className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Privacy Model Inspector</h3>
              </div>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Midnight's dual-state engine splits public verification from private data. Here is exactly what is kept private vs. what is published:
              </p>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                  <div className="flex items-center gap-1.5 font-semibold text-emerald-400 mb-1">
                    <Eye className="w-3.5 h-3.5" />
                    <span>PUBLIC ON-CHAIN LEDGER:</span>
                  </div>
                  <ul className="list-disc list-inside text-slate-300 space-y-0.5 text-[11px]">
                    <li>Target Merchant Public Key</li>
                    <li>Redeemed Grant Value (tNIGHT)</li>
                    <li>Voucher Nullifier Hash (prevents double claims)</li>
                    <li>Valid Zero-Knowledge Proof Signature</li>
                  </ul>
                </div>

                <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/30">
                  <div className="flex items-center gap-1.5 font-semibold text-cyan-400 mb-1">
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>PRIVATE (NEVER ON-CHAIN):</span>
                  </div>
                  <ul className="list-disc list-inside text-slate-300 space-y-0.5 text-[11px]">
                    <li>Student Name & Real-World Identity</li>
                    <li>Student National ID / Roll Number</li>
                    <li>Student Wallet Address / Financial History</li>
                    <li>Raw Grant Voucher Secret & Salt</li>
                    <li>Academic Transcript & Eligibility Data</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Approved Merchants Directory */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Approved Merchant List</h4>
                <span className="text-[11px] text-cyan-400 font-mono">Purpose-Restricted</span>
              </div>
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1 text-xs">
                {ledgerState.merchants.map((m) => (
                  <div
                    key={m.id}
                    className={`p-2.5 rounded-lg border flex items-center justify-between ${
                      m.isApproved
                        ? 'bg-midnight-900/50 border-slate-800'
                        : 'bg-rose-950/20 border-rose-900/30 opacity-60'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-white text-[12px]">{m.name}</div>
                      <div className="text-[10px] text-slate-400">{m.category}</div>
                    </div>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        m.isApproved ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' : 'bg-rose-950 text-rose-400'
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
      )}

      {/* DONOR PORTAL */}
      {userRole === 'donor' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 glass-panel p-6 md:p-8 rounded-2xl border border-slate-800 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
                <Coins className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Contribute to Scholarship Pool</h2>
                <p className="text-xs text-slate-400">
                  Fund educational grants directly to the smart contract with purpose-specific settlement guarantees.
                </p>
              </div>
            </div>

            <form onSubmit={handleDepositPool} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Deposit Amount (tNIGHT)
                </label>
                <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(Number(e.target.value))}
                  min="1000"
                  step="1000"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-midnight-900/90 border border-slate-700/80 text-white font-mono text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>

              <button
                type="submit"
                disabled={isDepositing}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-xl shadow-purple-500/20 transition-all transform active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isDepositing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Broadcasting deposit circuit call...</span>
                  </>
                ) : (
                  <>
                    <PlusCircle className="w-4 h-4" />
                    <span>Deposit into Scholarship Treasury</span>
                  </>
                )}
              </button>
            </form>

            {depositSuccessMsg && (
              <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
                {depositSuccessMsg}
              </div>
            )}

            <div className="p-4 rounded-xl bg-midnight-900/70 border border-slate-800 text-xs text-slate-300 space-y-2">
              <strong className="text-white block">Donor Auditability Guarantee:</strong>
              <p>
                Unlike traditional non-profit donations where funds disappear into bureaucratic intermediaries,
                EduFund smart contracts mathematically prevent funds from being redeemed anywhere except approved
                educational institutions.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 glass-panel p-6 md:p-8 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Merchant Disbursement Audit</h3>
            <p className="text-xs text-slate-400">
              Real-time on-chain accounting of all redeemed grants across registered educational providers:
            </p>

            <div className="space-y-3">
              {ledgerState.merchants.map((m) => (
                <div key={m.id} className="p-3 rounded-xl bg-midnight-900/60 border border-slate-800/80 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-white">{m.name}</div>
                    <div className="text-[11px] text-slate-400">{m.category}</div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-cyan-400">
                      {Number(m.totalRedeemed).toLocaleString()} tNIGHT
                    </span>
                    <span className="block text-[10px] text-slate-500">Settled to date</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ADMIN PORTAL */}
      {userRole === 'admin' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 glass-panel p-6 md:p-8 rounded-2xl border border-slate-800 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Accredit Educational Merchant</h2>
                <p className="text-xs text-slate-400">
                  Register universities, STEM equipment suppliers, and verified course providers.
                </p>
              </div>
            </div>

            <form onSubmit={handleRegisterMerchant} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Institution / Vendor Name
                </label>
                <input
                  type="text"
                  value={newMerchantName}
                  onChange={(e) => setNewMerchantName(e.target.value)}
                  placeholder="e.g. City Tech University Bookstore"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-midnight-900/90 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Category
                </label>
                <select
                  value={newMerchantCategory}
                  onChange={(e) => setNewMerchantCategory(e.target.value as any)}
                  className="w-full px-4 py-3 rounded-xl bg-midnight-900/90 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-amber-400"
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
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-semibold text-sm shadow-xl shadow-amber-500/20 transition-all transform active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isRegistering ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Signing circuit with Admin Witness...</span>
                  </>
                ) : (
                  <>
                    <PlusCircle className="w-4 h-4" />
                    <span>Accredit Merchant</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 glass-panel p-6 md:p-8 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Merchant Accreditation Registry</h3>
            <p className="text-xs text-slate-400">
              Only merchants in this on-chain registry can accept and settle EduFund grant vouchers.
            </p>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {ledgerState.merchants.map((m) => (
                <div
                  key={m.id}
                  className="p-3.5 rounded-xl bg-midnight-900/60 border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-semibold text-white text-sm">{m.name}</div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                      <span>{m.category}</span>
                      <span>•</span>
                      <span className="font-mono text-slate-500">{m.publicKeyHex.slice(0, 16)}...</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                        m.isApproved
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                          : 'bg-rose-950 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {m.isApproved ? 'Active' : 'Suspended'}
                    </span>
                    <button
                      onClick={() => handleToggleMerchant(m.id)}
                      className="px-2.5 py-1 text-[11px] rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
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
