import React, { useState } from "react";
import CommentModal from "./CommentModal";

export default function TransactionRow({ txn, onAddComment }) {
  const [open, setOpen] = useState(false);

  const date = String(txn.date ?? "");
  const category = String(txn.category ?? "");
  const amount = Number(txn.amount ?? 0);
  const derivedType = (String(txn.type || "").trim().toLowerCase()) ||
    ((category.toLowerCase().includes("salary") || category.toLowerCase().includes("freelance") || category.toLowerCase().includes("bonus") || category.toLowerCase().includes("refund") || category.toLowerCase().includes("reimb")) ? "income" : "expense");
  const isIncome = derivedType === "income";

  return (
    <tr>
      <td>{date}</td>
      <td>{category}</td>
      <td style={{ textTransform: "capitalize" }}>{derivedType}</td>
      <td className="amount-cell" style={{ color: isIncome ? "#27AE60" : "#C0392B" }}>
        ${amount.toFixed(2)}
      </td>
      <td className="action-cell">
        <button className="btn" onClick={() => setOpen(true)}>Comment</button>
        <CommentModal
          open={open}
          onClose={() => setOpen(false)}
          onSubmit={async (text) => {
            await onAddComment(txn.id, text);
            setOpen(false);
          }}
        />
      </td>
      <td className="latest-cell">
        {txn?.comments?.[0]?.text
          ? <span title={new Date(txn.comments[0].ts).toLocaleString()}>
              {String(txn.comments[0].text)}
            </span>
          : <em>No comments</em>}
      </td>
    </tr>
  );
}
