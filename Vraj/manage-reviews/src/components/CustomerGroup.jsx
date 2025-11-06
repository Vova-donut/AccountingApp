import React, { useState } from "react";
import TransactionRow from "./TransactionRow";
import AddTransactionForm from "./AddTransactionForm";
import TransactionChart from "./TransactionChart";

export default function CustomerGroup({
  customerId,
  customerName,
  transactions = [],
  onAddComment,
  onAddTransaction,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="card" style={{ marginBottom: 14, padding: 0 }}>
      <button className="group-header" onClick={() => setOpen(!open)}>
        <span>{customerName}</span>
        <span>{open ? "▾" : "▸"} ({transactions.length})</span>
      </button>

      {open && (
        <div className="group-content">
          {onAddTransaction && (
            <AddTransactionForm
              customerId={customerId}
              customerName={customerName}
              onAdd={onAddTransaction}
            />
          )}

          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Action</th>
                <th>Latest Comment</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <TransactionRow
                  key={txn.id}
                  txn={txn}
                  onAddComment={onAddComment}
                />
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: 12 }}>
            <TransactionChart data={transactions} />
          </div>
        </div>
      )}
    </div>
  );
}
