import { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios'; // Commented out - uncomment when backend is ready
import { useAuth } from './AuthContext.jsx';

const WalletContext = createContext();

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
  const { token } = useAuth();
  const [balances, setBalances] = useState({ kes: 0, usd: 0 });
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (token) {
      fetchWalletData();
    }
  }, [token]);

  // Commented out backend API calls - uncomment when backend is ready
  // const fetchWalletData = async () => {
  //   try {
  //     const response = await axios.get('/api/wallet/');
  //     setBalances(response.data.balances);
  //     setTransactions(response.data.transactions);
  //   } catch (error) {
  //     console.error('Failed to fetch wallet data');
  //   }
  // };

  // const deposit = async (amountKes) => {
  //   // Call your deposit API
  //   await axios.post('/api/wallet/deposit/', { amount_kes: amountKes });
  //   fetchWalletData(); // Refresh data
  // };

  // const withdraw = async (amountUsd) => {
  //   // Call your withdraw API
  //   await axios.post('/api/wallet/withdraw/', { amount_usd: amountUsd });
  //   fetchWalletData();
  // };

  // Temporary: Mock wallet functions for frontend testing
  const fetchWalletData = async () => {
    // Mock data
    setBalances({ kes: 10000, usd: 100 });
    setTransactions([
      { id: 1, type: 'deposit', amount: 5000, currency: 'KES', date: '2023-10-01' },
      { id: 2, type: 'withdraw', amount: 50, currency: 'USD', date: '2023-10-02' },
    ]);
  };

  const deposit = async (amountKes) => {
    console.log('Deposit amount:', amountKes);
    fetchWalletData(); // Mock refresh
  };

  const withdraw = async (amountUsd) => {
    console.log('Withdraw amount:', amountUsd);
    fetchWalletData(); // Mock refresh
  };

  return (
    <WalletContext.Provider value={{ balances, transactions, deposit, withdraw, fetchWalletData }}>
      {children}
    </WalletContext.Provider>
  );
};