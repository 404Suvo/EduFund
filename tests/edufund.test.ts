import { describe, it, expect, beforeEach } from 'vitest';
import * as rt from '@midnight-ntwrk/compact-runtime';
// @ts-ignore - imported from compiled managed output
import { Contract, ledger, pureCircuits, type AdminSecretKey, type MerchantSecretKey, type MerchantPublicKey } from '../managed/contract/index.js';

describe('EduFund Compact Smart Contract Test Suite', () => {
  let adminSk: AdminSecretKey;
  let adminPk: any;
  let merchantSk: MerchantSecretKey;
  let merchantPk: MerchantPublicKey;
  let contract: any;
  let contractState: any;
  let privateState: any;
  const userAddr = rt.dummyUserAddress();
  const contractAddr = rt.dummyContractAddress();

  beforeEach(() => {
    // Generate deterministic keys for testing
    adminSk = { bytes: new Uint8Array(32).fill(1) };
    adminPk = pureCircuits.deriveAdminPublicKey(adminSk);

    merchantSk = { bytes: new Uint8Array(32).fill(2) };
    merchantPk = pureCircuits.deriveMerchantPublicKey(merchantSk);

    // Initialize contract with admin witness
    contract = new Contract({
      getAdminSecret: (ctx: any) => [ctx.privateState, adminSk]
    });

    const constructorCtx = rt.createConstructorContext(contractAddr, userAddr);
    const initResult = contract.initialState(constructorCtx, adminPk);
    contractState = initResult.currentContractState.data;
    privateState = initResult.currentPrivateState;
  });

  it('Test 1: Contract Initialization and Donor Grant Deposit', () => {
    // Initial state verification
    const initialLedger = ledger(contractState);
    expect(initialLedger.totalPool).toBe(0n);
    expect(initialLedger.totalDisbursed).toBe(0n);
    expect(initialLedger.admin.bytes).toEqual(adminPk.bytes);

    // Donor deposits 500,000 tNIGHT equivalent to the scholarship pool
    const depositCtx = rt.createCircuitContext(contractAddr, userAddr, contractState, privateState);
    const depositRes = contract.impureCircuits.depositPool(depositCtx, 500000n);

    contractState = depositRes.context.currentQueryContext.state;
    privateState = depositRes.context.currentPrivateState;

    const updatedLedger = ledger(contractState);
    expect(updatedLedger.totalPool).toBe(500000n);
    expect(updatedLedger.totalDisbursed).toBe(0n);
  });

  it('Test 2: Educational Merchant Accreditation and Access Control', () => {
    // 1. Admin accredits university/merchant
    const regCtx = rt.createCircuitContext(contractAddr, userAddr, contractState, privateState);
    const regRes = contract.impureCircuits.registerMerchant(regCtx, merchantPk);

    contractState = regRes.context.currentQueryContext.state;
    privateState = regRes.context.currentPrivateState;

    const postRegLedger = ledger(contractState);
    expect(postRegLedger.approvedMerchants.member(merchantPk)).toBe(true);
    expect(postRegLedger.approvedMerchants.lookup(merchantPk)).toBe(true);
    expect(postRegLedger.merchantRedemptions.lookup(merchantPk)).toBe(0n);

    // 2. Non-admin cannot accredit merchants
    const fakeAdminSk = { bytes: new Uint8Array(32).fill(99) };
    const unauthorizedContract = new Contract({
      getAdminSecret: (ctx: any) => [ctx.privateState, fakeAdminSk]
    });
    const unauthorizedCtx = rt.createCircuitContext(contractAddr, userAddr, contractState, privateState);
    expect(() => {
      unauthorizedContract.impureCircuits.registerMerchant(unauthorizedCtx, merchantPk);
    }).toThrow(/Only admin can register educational merchants/);
  });

  it('Test 3: Zero-Knowledge Grant Redemption and Merchant Settlement', () => {
    // Step A: Fund pool with 1,000,000 units
    let ctx = rt.createCircuitContext(contractAddr, userAddr, contractState, privateState);
    let res = contract.impureCircuits.depositPool(ctx, 1000000n);
    contractState = res.context.currentQueryContext.state;
    privateState = res.context.currentPrivateState;

    // Step B: Accredit educational merchant (e.g. University Bookstore)
    ctx = rt.createCircuitContext(contractAddr, userAddr, contractState, privateState);
    res = contract.impureCircuits.registerMerchant(ctx, merchantPk);
    contractState = res.context.currentQueryContext.state;
    privateState = res.context.currentPrivateState;

    // Step C: Student redeems 150,000 units with blinded nullifier
    const grantNullifier = new Uint8Array(32).fill(42);
    ctx = rt.createCircuitContext(contractAddr, userAddr, contractState, privateState);
    res = contract.impureCircuits.redeemGrant(ctx, grantNullifier, merchantPk, 150000n);
    contractState = res.context.currentQueryContext.state;
    privateState = res.context.currentPrivateState;

    const currentLedger = ledger(contractState);
    expect(currentLedger.totalDisbursed).toBe(150000n);
    expect(currentLedger.totalPool).toBe(1000000n);
    expect(currentLedger.nullifiers.member(grantNullifier)).toBe(true);
    expect(currentLedger.merchantRedemptions.lookup(merchantPk)).toBe(150000n);
  });

  it('Test 4: Prevents Double-Spending and Replay Attacks', () => {
    // Set up funded pool and approved merchant
    let ctx = rt.createCircuitContext(contractAddr, userAddr, contractState, privateState);
    let res = contract.impureCircuits.depositPool(ctx, 500000n);
    contractState = res.context.currentQueryContext.state;
    privateState = res.context.currentPrivateState;

    ctx = rt.createCircuitContext(contractAddr, userAddr, contractState, privateState);
    res = contract.impureCircuits.registerMerchant(ctx, merchantPk);
    contractState = res.context.currentQueryContext.state;
    privateState = res.context.currentPrivateState;

    // Redeem voucher once
    const grantNullifier = new Uint8Array(32).fill(77);
    ctx = rt.createCircuitContext(contractAddr, userAddr, contractState, privateState);
    res = contract.impureCircuits.redeemGrant(ctx, grantNullifier, merchantPk, 100000n);
    contractState = res.context.currentQueryContext.state;
    privateState = res.context.currentPrivateState;

    // Attempting second redemption with same nullifier MUST throw
    const doubleSpendCtx = rt.createCircuitContext(contractAddr, userAddr, contractState, privateState);
    expect(() => {
      contract.impureCircuits.redeemGrant(doubleSpendCtx, grantNullifier, merchantPk, 100000n);
    }).toThrow(/Grant voucher has already been redeemed/);
  });

  it('Test 5: Rejects Redemption at Unapproved Merchants', () => {
    // Fund pool
    let ctx = rt.createCircuitContext(contractAddr, userAddr, contractState, privateState);
    let res = contract.impureCircuits.depositPool(ctx, 500000n);
    contractState = res.context.currentQueryContext.state;
    privateState = res.context.currentPrivateState;

    // Unregistered merchant
    const unapprovedMerchantPk: MerchantPublicKey = { bytes: new Uint8Array(32).fill(88) };
    const nullifier = new Uint8Array(32).fill(55);

    const invalidMerchantCtx = rt.createCircuitContext(contractAddr, userAddr, contractState, privateState);
    expect(() => {
      contract.impureCircuits.redeemGrant(invalidMerchantCtx, nullifier, unapprovedMerchantPk, 50000n);
    }).toThrow(/Merchant is not approved/);
  });
});
