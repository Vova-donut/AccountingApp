import React, { useState } from "react";
import TransactionRow from "./TransactionRow";
import AddTransactionForm from "./AddTransactionForm";
import TransactionChart from "./TransactionChart";

export default function CustomerGroup({
  customerId,
  customerName,
  transactions = [],
  onAddComment,
  onAddTransaction
}) {
  const [open, setOpen] = useState(false);

  return (
    <div style={box}>
      <button style={header} onClick={() => setOpen(!open)}>
        <span>{customerName}</span>
        <span>{open ? "▼" : "▶"} ({transactions.length})</span>
      </button>

      {open && (
        <div style={content}>
          {onAddTransaction && (
            <AddTransactionForm
              customerId={customerId}
              customerName={customerName}
              onAdd={onAddTransaction}
            />
          )}

          <table width="100%" cellPadding="8" style={table} className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Action</th>
                <th>Latest Comment</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <TransactionRow key={txn.id} txn={txn} onAddComment={onAddComment} />
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

/* theme */
const colors = {
  midnight: "#1F305E",
  textOnNight: "#FFFFFF",
  softGrayBg: "#F2F4F8",
  white: "#FFFFFF",
  border: "#D1D5DB"
};
const box = { border: `1px solid ${colors.border}`, borderRadius: 12, overflow: "hidden", marginBottom: 14, background: colors.softGrayBg };
const header = { width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 14px", background:colors.midnight, color:colors.textOnNight, border:"none", cursor:"pointer", fontWeight:600, fontSize:16 };
const content = { padding:"12px 14px", background: colors.white };
const table = { width:"100%", borderCollapse:"separate", borderSpacing:0 };

