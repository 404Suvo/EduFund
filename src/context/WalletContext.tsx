import React, { createContext, useContext, useState } from 'react';
import type { ConnectedAPI } from '@midnight-ntwrk/dapp-connector-api';
import { MOCK_STUDENTS, MOCK_DONORS, StudentProfile, Donor, Transaction } from '../data/mockData';
import { ON_CHAIN_TRANSACTIONS } from '../data/onChainData';
import { connectMidnightWallet, createDemoWallet } from '../midnight/wallet';

export type UserRole = 'student' | 'donor' | 'merchant' | 'admin';

interface WalletContextType {
  isConnected: boolean;
  walletAddress: string;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  isConnectModalOpen: boolean;
  openConnectModal: () => void;
  closeConnectModal: () => void;
  connectWallet: (providerName: string, preferredRole?: UserRole) => Promise<void>;
  disconnectWallet: () => void;
  currentStudent: StudentProfile;
  currentDonor: Donor;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  clearToast: () => void;
  transactions: Transaction[];
  addTransaction: (tx: Transaction) => void;
  connectedApi?: ConnectedAPI;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [walletAddress, setWalletAddress] = useState<string>('mn_addr_preprod1cas900z8s709cja2k93a27lnz8z6l2cvfwxerwtlfzqt6fv3p3vqcx4d4j');
  const [userRole, setUserRole] = useState<UserRole>('student');
  const [isConnectModalOpen, setIsConnectModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [connectedApi, setConnectedApi] = useState<ConnectedAPI | undefined>(undefined);

  // Initialize transactions from on-chain persistent storage
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const stored = localStorage.getItem('edufund_onchain_transactions');
      if (stored) {
        const parsed = JSON.parse(stored);
        const hasAnchor = parsed.some((t: Transaction) => 
          t.hash?.toLowerCase() === '0xd5ea58d1702899641495e5a879bd1696dadc611fd72c965351b7cabe3af0fbf3'.toLowerCase()
        );
        const hasOldMocks = parsed.some((t: Transaction) => 
          t.hash?.startsWith('0x7f83a21b44ec') || (t.hash && t.hash.length < 50)
        );
        if (hasAnchor && !hasOldMocks) {
          return parsed;
        }
      }
      localStorage.setItem('edufund_onchain_transactions', JSON.stringify(ON_CHAIN_TRANSACTIONS));
      return ON_CHAIN_TRANSACTIONS;
    } catch {
      return ON_CHAIN_TRANSACTIONS;
    }
  });

  const addTransaction = (newTx: Transaction) => {
    setTransactions((prev) => {
      const updated = [newTx, ...prev];
      try {
        localStorage.setItem('edufund_onchain_transactions', JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to persist transaction to localStorage', e);
      }
      return updated;
    });
  };

  const currentStudent = MOCK_STUDENTS[0]; // Aarav Sharma (STU-9402)
  const currentDonor = MOCK_DONORS[0]; // Acme Technologies CSR

  const openConnectModal = () => setIsConnectModalOpen(true);
  const closeConnectModal = () => setIsConnectModalOpen(false);

  const connectWallet = async (providerName: string, preferredRole?: UserRole) => {
    if (preferredRole) {
      setUserRole(preferredRole);
    }

    try {
      // Check if real Midnight Lace or 1AM wallet is available in window.midnight
      const midnightWallets = typeof window !== 'undefined' ? window.midnight : undefined;
      let matchedWalletId: string | undefined;

      if (midnightWallets) {
        if (providerName === 'lace' && (midnightWallets.mnLace || midnightWallets.lace)) {
          matchedWalletId = midnightWallets.mnLace ? 'mnLace' : 'lace';
        } else if (midnightWallets[providerName]) {
          matchedWalletId = providerName;
        } else {
          // Check for any available wallet
          const firstKey = Object.keys(midnightWallets)[0];
          if (firstKey) matchedWalletId = firstKey;
        }
      }

      if (matchedWalletId) {
        // Real Midnight Wallet popup authorization!
        showToast('Opening Midnight Wallet approval popup...');
        const res = await connectMidnightWallet(matchedWalletId, 'preprod');
        setConnectedApi(res.connectedApi);
        setWalletAddress(res.address);
        setIsConnected(true);
        setIsConnectModalOpen(false);
        showToast(`Connected to Midnight Preprod with ${res.name}!`);
        return;
      }
    } catch (err: any) {
      console.warn('Midnight wallet connection popup rejected or unavailable:', err);
      showToast(err?.message || 'Wallet connection cancelled.');
      return;
    }

    // Fallback to pre-configured demo sandbox identity on Preprod
    const demo = createDemoWallet('preprod');
    setConnectedApi(undefined);
    setWalletAddress(demo.address);
    setIsConnected(true);
    setIsConnectModalOpen(false);
    showToast(`Connected to Midnight Preprod Sandbox (Address: ${demo.address.slice(0, 16)}...)`);
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setConnectedApi(undefined);
    setWalletAddress('');
    showToast('Wallet disconnected.');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  const clearToast = () => setToastMessage(null);

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        walletAddress,
        userRole,
        setUserRole,
        isConnectModalOpen,
        openConnectModal,
        closeConnectModal,
        connectWallet,
        disconnectWallet,
        currentStudent,
        currentDonor,
        toastMessage,
        showToast,
        clearToast,
        transactions,
        addTransaction,
        connectedApi,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
