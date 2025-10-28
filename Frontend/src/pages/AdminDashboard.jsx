import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
// import { useAuth } from '../context/AuthContext.jsx'; // Commented out - uncomment when backend is ready
import Button from '../components/Button.jsx';
// import axios from '../utils/api.js'; // Commented out - uncomment when backend is ready

const AdminDashboard = () => {
  // const { user } = useAuth(); // Removed unused 'user'
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [settings, setSettings] = useState({ exchangeRate: 150, fee: 20 }); // Default values
  const [liquidity, setLiquidity] = useState({ totalKes: 0, totalUsd: 0 });
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit } = useForm(); // Removed unused 'reset'

  // Temporary: Mock admin check for frontend testing
  // if (!user || !user.is_admin) {
  //   return <div className="text-center mt-10 text-red-500">Access Denied: Admin Only</div>;
  // }

  // Commented out backend API calls - uncomment when backend is ready
  // useEffect(() => {
  //   fetchAdminData();
  // }, []);

  // const fetchAdminData = async () => {
  //   try {
  //     const [usersRes, txRes, settingsRes, liquidityRes] = await Promise.all([
  //       axios.get('/api/admin/users/'),
  //       axios.get('/api/admin/transactions/'),
  //       axios.get('/api/admin/settings/'),
  //       axios.get('/api/admin/liquidity/'),
  //     ]);
  //     setUsers(usersRes.data);
  //     setTransactions(txRes.data);
  //     setSettings(settingsRes.data);
  //     setLiquidity(liquidityRes.data);
  //   } catch (error) {
  //     alert('Failed to load admin data');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const updateSettings = async (data) => {
  //   try {
  //     await axios.put('/api/admin/settings/', data);
  //     setSettings(data);
  //     alert('Settings updated');
  //   } catch (error) {
  //     alert('Update failed');
  //   }
  // };

  // const handleTransactionAction = async (id, action) => {
  //   try {
  //     await axios.post(`/api/admin/transactions/${id}/${action}/`);
  //     fetchAdminData(); // Refresh data
  //   } catch (error) {
  //     alert(`${action} failed`);
  //   }
  // };

  // Temporary: Mock admin data for frontend testing
  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    // Mock data
    setUsers([
      { id: 1, username: 'user1', email: 'user1@example.com', mpesa_number: '+254712345678', deriv_account_id: '123456' },
      { id: 2, username: 'user2', email: 'user2@example.com', mpesa_number: '+254798765432', deriv_account_id: '654321' },
    ]);
    setTransactions([
      { id: 1, user: { username: 'user1' }, transaction_type: 'deposit', amount_kes: 5000, amount_usd: 33.33, status: 'completed' },
      { id: 2, user: { username: 'user2' }, transaction_type: 'withdraw', amount_kes: 7500, amount_usd: 50, status: 'pending' },
    ]);
    setSettings({ exchangeRate: 150, fee: 20 });
    setLiquidity({ totalKes: 100000, totalUsd: 667 });
    setLoading(false);
  };

  const updateSettings = async (data) => {
    console.log('Update settings:', data);
    setSettings(data);
    alert('Settings updated (mocked)');
  };

  const handleTransactionAction = async (id, action) => {
    console.log(`${action} transaction ${id}`);
    fetchAdminData(); // Mock refresh
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-6 font-bold">Admin Dashboard</h1>

      {/* Liquidity Monitor */}
      <div className="bg-white p-4 rounded shadow-md mb-6">
        <h2 className="text-xl mb-2">System Liquidity</h2>
        <p>Total KES: {liquidity.totalKes}</p>
        <p>Total USD: {liquidity.totalUsd}</p>
      </div>

      {/* Settings: Exchange Rates and Fees */}
      <div className="bg-white p-4 rounded shadow-md mb-6">
        <h2 className="text-xl mb-2">Settings</h2>
        <form onSubmit={handleSubmit(updateSettings)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Exchange Rate (KES per USD)</label>
            <input 
              {...register('exchangeRate')} 
              type="number" 
              defaultValue={settings.exchangeRate} 
              className="block w-full p-2 border rounded" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Transaction Fee (KES)</label>
            <input 
              {...register('fee')} 
              type="number" 
              defaultValue={settings.fee} 
              className="block w-full p-2 border rounded" 
            />
          </div>
          <Button type="submit">Update Settings</Button>
        </form>
      </div>

      {/* Users Management */}
      <div className="bg-white p-4 rounded shadow-md mb-6">
        <h2 className="text-xl mb-2">Users</h2>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Username</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">M-Pesa Number</th>
              <th className="p-2 text-left">Deriv ID</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b">
                <td className="p-2">{u.username}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.mpesa_number}</td>
                <td className="p-2">{u.deriv_account_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Transactions Management */}
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-xl mb-2">Transactions</h2>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">User</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Amount (KES/USD)</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-b">
                <td className="p-2">{tx.user.username}</td>
                <td className="p-2">{tx.transaction_type}</td>
                <td className="p-2">{tx.amount_kes} KES / {tx.amount_usd} USD</td>
                <td className="p-2">{tx.status}</td>
                <td className="p-2 space-x-2">
                  {tx.transaction_type === 'withdraw' && tx.status === 'pending' && (
                    <>
                      <Button 
                        onClick={() => handleTransactionAction(tx.id, 'approve')} 
                        variant="primary" 
                        className="text-xs"
                      >
                        Approve
                      </Button>
                      <Button 
                        onClick={() => handleTransactionAction(tx.id, 'reject')} 
                        variant="secondary" 
                        className="text-xs"
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;