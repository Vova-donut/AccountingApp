import React, { useState } from "react";
import TransactionRow from "./TransactionRow";
import AddTransactionForm from "./AddTransactionForm";

export default function CustomerGroup({ customerId, customerName, transactions, onAddComment, onAddTransaction }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={box}>
      <button style={header} onClick={() => setOpen(!open)}>
        <span>{customerName}</span>
        <span>{open ? "▲" : "▼"} ({transactions.length})</span>
      </button>

      {open && (
        <div style={{ padding: "8px 12px" }}>
          <AddTransactionForm
            customerId={customerId}
            customerName={customerName}
            onAdd={onAddTransaction}
          />
          <table width="100%" cellPadding="8">
            <thead>
              <tr>
                <th>Date</th><th>Category</th><th>Amount</th><th>Action</th><th>Latest Comment</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(txn => (
                <TransactionRow key={txn.id} txn={txn} onAddComment={onAddComment} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const box = { border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden", marginBottom: 10 };
const header = { width:"100%", display:"flex", justifyContent:"space-between", padding:"10px 12px", background:"#f9fafb", border:"none", cursor:"pointer", fontWeight:600 };
