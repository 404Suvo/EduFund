import React, { createContext, useContext, useState } from 'react';
import { MOCK_STUDENTS, MOCK_DONORS, MOCK_TRANSACTIONS, StudentProfile, Donor, Transaction } from '../data/mockData';

export type UserRole = 'student' | 'donor' | 'merchant' | 'admin';

interface WalletContextType {
  isConnected: boolean;
  walletAddress: string;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  isConnectModalOpen: boolean;
  openConnectModal: () => void;
  closeConnectModal: () => void;
  connectWallet: (providerName: string, preferredRole?: UserRole) => void;
  disconnectWallet: () => void;
  currentStudent: StudentProfile;
  currentDonor: Donor;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  clearToast: () => void;
  transactions: Transaction[];
  addTransaction: (tx: Transaction) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [walletAddress, setWalletAddress] = useState<string>('0x9402abf12c8901235b89a01f543dc8e7192ba01');
  const [userRole, setUserRole] = useState<UserRole>('student');
  const [isConnectModalOpen, setIsConnectModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);

  const addTransaction = (newTx: Transaction) => {
    setTransactions((prev) => [newTx, ...prev]);
  };

  const currentStudent = MOCK_STUDENTS[0]; // Aarav Sharma (STU-9402)
  const currentDonor = MOCK_DONORS[0]; // Acme Technologies CSR

  const openConnectModal = () => setIsConnectModalOpen(true);
  const closeConnectModal = () => setIsConnectModalOpen(false);

  const connectWallet = (providerName: string, preferredRole?: UserRole) => {
    setIsConnected(true);
    if (preferredRole) {
      setUserRole(preferredRole);
    }
    const mockAddr = preferredRole === 'donor' 
      ? '0xacme_corp_treasury_9981' 
      : '0x9402abf12c8901235b89a01f543dc8e7192ba01';
    setWalletAddress(mockAddr);
    setIsConnectModalOpen(false);
    showToast(`Connected successfully with ${providerName}!`);
  };

  const disconnectWallet = () => {
    setIsConnected(false);
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
