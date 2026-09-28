import type { ConnectedAPI, InitialAPI } from '@midnight-ntwrk/dapp-connector-api';
import type { MidnightNetwork } from './config';

export type WalletOption = {
  readonly id: string;
  readonly name: string;
  readonly apiVersion?: string;
  readonly icon?: string;
};

export type ConnectedWallet = {
  readonly id: string;
  readonly name: string;
  readonly address: string;
  readonly network: MidnightNetwork;
  readonly isDemo: boolean;
  readonly connectedApi?: ConnectedAPI;
};

declare global {
  interface Window {
    midnight?: Record<string, InitialAPI>;
  }
}

/**
 * Returns all installed Midnight wallet browser extensions detected in window.midnight
 */
export const listInstalledWallets = (): WalletOption[] => {
  if (typeof window === 'undefined' || !window.midnight) return [];
  return Object.entries(window.midnight).map(([id, wallet]) => ({
    id,
    name: wallet.name || id,
    apiVersion: wallet.apiVersion,
    icon: wallet.icon,
  }));
};

/**
 * Connects to a real Midnight wallet (Lace, 1AM, etc.).
 * This triggers the Midnight Wallet approval popup window.
 */
export const connectMidnightWallet = async (
  walletId: string,
  network: MidnightNetwork = 'preprod',
): Promise<ConnectedWallet> => {
  const wallet = window.midnight?.[walletId];

  if (!wallet) {
    throw new Error(`Selected Midnight wallet '${walletId}' is not installed or available.`);
  }

  // Opens the Midnight Wallet permission popup!
  const connected: ConnectedAPI = await wallet.connect(network);
  const status = await connected.getConnectionStatus();

  if (status.status !== 'connected') {
    throw new Error('Connection request was rejected by the Midnight wallet.');
  }

  const { unshieldedAddress } = await connected.getUnshieldedAddress();

  return {
    id: walletId,
    name: wallet.name || 'Midnight Lace Wallet',
    address: unshieldedAddress,
    network,
    isDemo: false,
    connectedApi: connected,
  };
};

/**
 * Fallback sandbox wallet for evaluations without the extension installed
 */
export const createDemoWallet = (network: MidnightNetwork = 'preprod'): ConnectedWallet => {
  const address = 'mn_addr_preprod125dcrdsalkkhl5nf8mr4t0gv0y4sjjt6nl0f5dcxes43wqyxrlfqunh3gf';
  return {
    id: `demo-lace-${network}`,
    name: 'Midnight Lace (Simulator)',
    address,
    network,
    isDemo: true,
  };
};

export const waitForMidnightExtensions = async (
  targetWalletId?: string,
  timeoutMs = 2000,
): Promise<boolean> => {
  if (typeof window === 'undefined') return false;

  const startTime = Date.now();
  while (Date.now() - startTime < timeoutMs) {
    const midnightObj = window.midnight;
    if (midnightObj && Object.keys(midnightObj).length > 0) {
      if (!targetWalletId || midnightObj[targetWalletId]) {
        return true;
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  return Boolean(
    window.midnight &&
      Object.keys(window.midnight).length > 0 &&
      (!targetWalletId || window.midnight[targetWalletId]),
  );
};
