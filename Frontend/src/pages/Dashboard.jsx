import { useWallet } from '../context/WalletContext.jsx';
import TransactionList from '../components/TransactionList.jsx';

const Dashboard = () => {
  const { balances, transactions } = useWallet();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Dashboard</h1>
      <div className="bg-white p-4 rounded shadow-md mb-4">
        <h2>Wallet Balances</h2>
        <p>KES: {balances.kes}</p>
        <p>USD: {balances.usd}</p>
      </div>
      <TransactionList transactions={transactions} />
      {/* Add deposit/withdraw buttons/forms here later */}
    </div>
  );
};

export default Dashboard;