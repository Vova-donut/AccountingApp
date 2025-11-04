import React, { useState } from "react";
import CommentModal from "./CommentModal";

export default function TransactionRow({ txn, onAddComment }) {
  const [open, setOpen] = useState(false);

  const date = String(txn.date ?? "");
  const category = String(txn.category ?? "");
  const amount = Number(txn.amount ?? 0);

  return (
    <tr>
      <td>{date}</td>
      <td>{category}</td>
      <td className="amount-cell">${amount.toFixed(2)}</td>
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
