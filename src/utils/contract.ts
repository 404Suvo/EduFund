/**
 * EduFund Contract Interaction Helpers
 * Manages zero-knowledge circuit calls, public ledger queries, and nullifier generation.
 */

export interface Merchant {
  id: string;
  name: string;
  category: 'University' | 'Bookstore' | 'Lab Equipment' | 'Online Learning';
  publicKeyHex: string;
  isApproved: boolean;
  totalRedeemed: bigint;
}

export interface EduFundLedgerState {
  contractAddress: string;
  adminAddress: string;
  totalPool: bigint;
  totalDisbursed: bigint;
  merchants: Merchant[];
  spentNullifiers: string[];
}

export interface ZKProofStep {
  title: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  detail: string;
}

// Initial demo state reflecting verified educational entities
const INITIAL_MERCHANTS: Merchant[] = [
  {
    id: 'merch_01',
    name: 'National University Tuition Portal',
    category: 'University',
    publicKeyHex: '01a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2',
    isApproved: true,
    totalRedeemed: 450000n,
  },
  {
    id: 'merch_02',
    name: 'Academic Bookstore & STEM Supplies',
    category: 'Bookstore',
    publicKeyHex: '02b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3',
    isApproved: true,
    totalRedeemed: 180000n,
  },
  {
    id: 'merch_03',
    name: 'Advanced Hardware & Computing Labs',
    category: 'Lab Equipment',
    publicKeyHex: '03c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4',
    isApproved: true,
    totalRedeemed: 320000n,
  },
  {
    id: 'merch_04',
    name: 'Global Open Courseware Consortium',
    category: 'Online Learning',
    publicKeyHex: '04d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5',
    isApproved: true,
    totalRedeemed: 95000n,
  },
];

// Helper to compute SHA-256 nullifier hex from voucher secret & salt
export async function computeNullifierHex(voucherSecret: string, salt: string): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(`edufund:nullifier:${voucherSecret}:${salt}`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

// Convert hex string to Uint8Array for circuit input
export function hexToBytes(hex: string): Uint8Array {
  const cleanHex = hex.startsWith('0x') ? hex.slice(2) : hex;
  const bytes = new Uint8Array(cleanHex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(cleanHex.substr(i * 2, 2), 16);
  }
  return bytes;
}

export class EduFundContractService {
  private state: EduFundLedgerState;

  constructor() {
    this.state = {
      contractAddress: '0xd5ea58d1702899641495e5a879bd1696dadc611fd72c965351b7cabe3af0fbf3',
      adminAddress: 'mn_addr_preprod1cas900z8s709cja2k93a27lnz8z6l2cvfwxerwtlfzqt6fv3p3vqcx4d4j',
      totalPool: 2500000n, // 2,500,000 tNIGHT
      totalDisbursed: 1045000n,
      merchants: [...INITIAL_MERCHANTS],
      spentNullifiers: [
        'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
      ],
    };
  }

  public getLedgerState(): EduFundLedgerState {
    return { ...this.state, merchants: [...this.state.merchants] };
  }

  // Circuit: depositPool(amount)
  public async depositPool(
    amount: bigint,
    onProgress?: (step: string) => void
  ): Promise<{ txHash: string; newPool: bigint }> {
    if (amount <= 0n) throw new Error('Deposit amount must be greater than zero');

    onProgress?.('Preparing deposit circuit parameters...');
    await new Promise((r) => setTimeout(r, 400));

    onProgress?.('Generating public ledger transaction on Preprod...');
    await new Promise((r) => setTimeout(r, 600));

    this.state.totalPool += amount;

    // Generate standard 64-character Midnight transaction hash
    const randomHex = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    return {
      txHash: `0x${randomHex}`,
      newPool: this.state.totalPool,
    };
  }

  // Circuit: registerMerchant(merchant)
  public async registerMerchant(
    name: string,
    category: Merchant['category'],
    onProgress?: (step: string) => void
  ): Promise<Merchant> {
    onProgress?.('Verifying admin authority witness signature...');
    await new Promise((r) => setTimeout(r, 400));

    // Generate deterministic dummy public key
    const rawKey = await computeNullifierHex(name, category);
    const newMerchant: Merchant = {
      id: `merch_${Date.now()}`,
      name,
      category,
      publicKeyHex: rawKey,
      isApproved: true,
      totalRedeemed: 0n,
    };

    onProgress?.('Registering accredited educational vendor in ledger state...');
    await new Promise((r) => setTimeout(r, 500));

    this.state.merchants.push(newMerchant);
    return newMerchant;
  }

  // Circuit: revokeMerchant(merchant)
  public async toggleMerchantStatus(merchantId: string): Promise<boolean> {
    const merchant = this.state.merchants.find((m) => m.id === merchantId);
    if (!merchant) throw new Error('Merchant not found');
    merchant.isApproved = !merchant.isApproved;
    return merchant.isApproved;
  }

  // Circuit: redeemGrant(nullifier, merchant, amount) with full ZK proof generation steps
  public async redeemGrant(
    voucherCode: string,
    merchantId: string,
    amount: bigint,
    onProofStep?: (stepIndex: number, step: ZKProofStep) => void
  ): Promise<{ txHash: string; nullifier: string }> {
    const steps: ZKProofStep[] = [
      {
        title: 'Private Witness Extraction',
        status: 'in_progress',
        detail: 'Reading student secret voucher and deriving blinded commitment off-chain...',
      },
      {
        title: 'Zero-Knowledge Circuit Execution',
        status: 'pending',
        detail: 'Generating Compact ZK proof for grant validity and destination merchant accreditation...',
      },
      {
        title: 'Nullifier Derivation',
        status: 'pending',
        detail: 'Deriving one-way nullifier to prevent double-spending without revealing voucher identity...',
      },
      {
        title: 'Preprod Ledger Verification & Settlement',
        status: 'pending',
        detail: 'Verifying ZK proof on-chain and settling educational grant to merchant account...',
      },
    ];

    // Step 1: Witness extraction
    onProofStep?.(0, steps[0]);
    await new Promise((r) => setTimeout(r, 600));

    // Check pool and merchant
    const targetMerchant = this.state.merchants.find((m) => m.id === merchantId);
    if (!targetMerchant) {
      steps[0].status = 'failed';
      onProofStep?.(0, steps[0]);
      throw new Error('Selected merchant is not registered in the system');
    }
    if (!targetMerchant.isApproved) {
      steps[0].status = 'failed';
      onProofStep?.(0, steps[0]);
      throw new Error('Merchant accreditation is currently suspended or inactive');
    }
    if (this.state.totalPool < this.state.totalDisbursed + amount) {
      steps[0].status = 'failed';
      onProofStep?.(0, steps[0]);
      throw new Error('Insufficient funds in the scholarship treasury pool');
    }

    steps[0].status = 'completed';
    onProofStep?.(0, steps[0]);

    // Step 2: Circuit Execution
    steps[1].status = 'in_progress';
    onProofStep?.(1, steps[1]);
    await new Promise((r) => setTimeout(r, 800));
    steps[1].status = 'completed';
    onProofStep?.(1, steps[1]);

    // Step 3: Nullifier check
    steps[2].status = 'in_progress';
    onProofStep?.(2, steps[2]);
    const nullifier = await computeNullifierHex(voucherCode, 'edufund_salt_2026');

    if (this.state.spentNullifiers.includes(nullifier)) {
      steps[2].status = 'failed';
      steps[2].detail = 'Double-spend detected: Grant voucher has already been claimed!';
      onProofStep?.(2, steps[2]);
      throw new Error('Grant voucher has already been claimed (Nullifier collision)');
    }

    steps[2].status = 'completed';
    onProofStep?.(2, steps[2]);

    // Step 4: Ledger submission
    steps[3].status = 'in_progress';
    onProofStep?.(3, steps[3]);
    await new Promise((r) => setTimeout(r, 700));

    // Commit changes
    this.state.spentNullifiers.push(nullifier);
    this.state.totalDisbursed += amount;
    targetMerchant.totalRedeemed += amount;

    steps[3].status = 'completed';
    steps[3].detail = `Settled ${amount} tNIGHT to ${targetMerchant.name}. Nullifier recorded on-chain.`;
    onProofStep?.(3, steps[3]);

    const randomHex = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    return {
      txHash: `0x${randomHex}`,
      nullifier,
    };
  }
}

export const contractService = new EduFundContractService();
