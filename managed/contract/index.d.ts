import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type AdminPublicKey = { bytes: Uint8Array };

export type AdminSecretKey = { bytes: Uint8Array };

export type MerchantPublicKey = { bytes: Uint8Array };

export type MerchantSecretKey = { bytes: Uint8Array };

export type Witnesses<PS> = {
  getAdminSecret(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, AdminSecretKey];
}

export type ImpureCircuits<PS> = {
  depositPool(context: __compactRuntime.CircuitContext<PS>, amount_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  registerMerchant(context: __compactRuntime.CircuitContext<PS>,
                   merchant_0: MerchantPublicKey): __compactRuntime.CircuitResults<PS, []>;
  revokeMerchant(context: __compactRuntime.CircuitContext<PS>,
                 merchant_0: MerchantPublicKey): __compactRuntime.CircuitResults<PS, []>;
  redeemGrant(context: __compactRuntime.CircuitContext<PS>,
              nullifier_0: Uint8Array,
              merchant_0: MerchantPublicKey,
              amount_0: bigint): __compactRuntime.CircuitResults<PS, []>;
}

export type ProvableCircuits<PS> = {
  depositPool(context: __compactRuntime.CircuitContext<PS>, amount_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  registerMerchant(context: __compactRuntime.CircuitContext<PS>,
                   merchant_0: MerchantPublicKey): __compactRuntime.CircuitResults<PS, []>;
  revokeMerchant(context: __compactRuntime.CircuitContext<PS>,
                 merchant_0: MerchantPublicKey): __compactRuntime.CircuitResults<PS, []>;
  redeemGrant(context: __compactRuntime.CircuitContext<PS>,
              nullifier_0: Uint8Array,
              merchant_0: MerchantPublicKey,
              amount_0: bigint): __compactRuntime.CircuitResults<PS, []>;
}

export type PureCircuits = {
  deriveAdminPublicKey(sk_0: AdminSecretKey): AdminPublicKey;
  deriveMerchantPublicKey(sk_0: MerchantSecretKey): MerchantPublicKey;
}

export type Circuits<PS> = {
  deriveAdminPublicKey(context: __compactRuntime.CircuitContext<PS>,
                       sk_0: AdminSecretKey): __compactRuntime.CircuitResults<PS, AdminPublicKey>;
  deriveMerchantPublicKey(context: __compactRuntime.CircuitContext<PS>,
                          sk_0: MerchantSecretKey): __compactRuntime.CircuitResults<PS, MerchantPublicKey>;
  depositPool(context: __compactRuntime.CircuitContext<PS>, amount_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  registerMerchant(context: __compactRuntime.CircuitContext<PS>,
                   merchant_0: MerchantPublicKey): __compactRuntime.CircuitResults<PS, []>;
  revokeMerchant(context: __compactRuntime.CircuitContext<PS>,
                 merchant_0: MerchantPublicKey): __compactRuntime.CircuitResults<PS, []>;
  redeemGrant(context: __compactRuntime.CircuitContext<PS>,
              nullifier_0: Uint8Array,
              merchant_0: MerchantPublicKey,
              amount_0: bigint): __compactRuntime.CircuitResults<PS, []>;
}

export type Ledger = {
  readonly admin: AdminPublicKey;
  readonly totalPool: bigint;
  readonly totalDisbursed: bigint;
  approvedMerchants: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: MerchantPublicKey): boolean;
    lookup(key_0: MerchantPublicKey): boolean;
    [Symbol.iterator](): Iterator<[MerchantPublicKey, boolean]>
  };
  nullifiers: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<[Uint8Array, boolean]>
  };
  merchantRedemptions: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: MerchantPublicKey): boolean;
    lookup(key_0: MerchantPublicKey): bigint;
    [Symbol.iterator](): Iterator<[MerchantPublicKey, bigint]>
  };
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  provableCircuits: ProvableCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>,
               initialAdmin_0: AdminPublicKey): __compactRuntime.ConstructorResult<PS>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
