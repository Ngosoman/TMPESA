const TransactionList = ({ transactions }) => {
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2>Transaction History</h2>
      <ul>
        {transactions.map((tx) => (
          <li key={tx.id} className="border-b py-2">
            {tx.transaction_type}: {tx.amount_kes} KES / {tx.amount_usd} USD - {tx.status} ({tx.timestamp})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;