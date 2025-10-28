import React, { useEffect, useMemo, useState } from "react";
import { bootstrapTransactions, listAllTransactions, addManagerComment } from "../services/commentsService";
import { addTransaction } from "../services/commentsService"; // <- new
import { sampleTransactions } from "../data/sampleTransactions";
import CustomerGroup from "../components/CustomerGroup";

const MANAGER_ID = "mgr_001";

export default function ManagerTransactions() {
  const [txns, setTxns] = useState([]);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    setLoading(true);
    const data = await listAllTransactions();
    setTxns(data);
    setLoading(false);
  }

  useEffect(() => {
    bootstrapTransactions(sampleTransactions);
    refresh();
  }, []);

  const groups = useMemo(() => {
    const map = new Map();
    for (const t of txns) {
      if (!map.has(t.customerId)) {
        map.set(t.customerId, { customerName: t.customerName, items: [] });
      }
      map.get(t.customerId).items.push(t);
    }
    return Array.from(map.entries()).map(([customerId, { customerName, items }]) => ({
      customerId, customerName, items
    }));
  }, [txns]);

  const handleAddComment = async (transactionId, text) => {
    await addManagerComment({ transactionId, authorId: MANAGER_ID, text });
    await refresh();
  };

  const handleAddTransaction = async ({ customerId, customerName, date, category, amount }) => {
    await addTransaction({ customerId, customerName, date, category, amount });
    await refresh();
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Customers & Their Transactions</h2>
      {loading && <p>Loading…</p>}
      {!loading && groups.length === 0 && <p>No data.</p>}
      {!loading && groups.map(g => (
        <CustomerGroup
          key={g.customerId}
          customerId={g.customerId}
          customerName={g.customerName}
          transactions={g.items}
          onAddComment={handleAddComment}
          onAddTransaction={handleAddTransaction}
        />
      ))}
    </div>
  );
}

