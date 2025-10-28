import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
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

  const fetchWalletData = async () => {
    try {
      const response = await axios.get('/api/wallet/');
      setBalances(response.data.balances);
      setTransactions(response.data.transactions);
    } catch (error) {
      console.error('Failed to fetch wallet data');
    }
  };

  const deposit = async (amountKes) => {
    // Call your deposit API
    await axios.post('/api/wallet/deposit/', { amount_kes: amountKes });
    fetchWalletData(); // Refresh data
  };

  const withdraw = async (amountUsd) => {
    // Call your withdraw API
    await axios.post('/api/wallet/withdraw/', { amount_usd: amountUsd });
    fetchWalletData();
  };

  return (
    <WalletContext.Provider value={{ balances, transactions, deposit, withdraw, fetchWalletData }}>
      {children}
    </WalletContext.Provider>
  );
};