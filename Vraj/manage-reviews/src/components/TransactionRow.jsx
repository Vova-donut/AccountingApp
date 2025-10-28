import React, { useState } from "react";
import CommentModal from "./CommentModal";

export default function TransactionRow({ txn, onAddComment }) {
  const [open, setOpen] = useState(false);

  return (
    <tr>
      <td>{txn.date}</td>
      <td>{txn.category}</td>
      <td>${txn.amount.toFixed(2)}</td>
      <td>
        <button onClick={() => setOpen(true)}>Comment</button>
        <CommentModal
          open={open}
          onClose={() => setOpen(false)}
          onSubmit={async (text) => {
            await onAddComment(txn.id, text);
            setOpen(false);
          }}
        />
      </td>
      <td>
        {txn.comments?.[0]?.text ? (
          <span title={new Date(txn.comments[0].ts).toLocaleString()}>
            {txn.comments[0].text}
          </span>
        ) : <em>No comments</em>}
      </td>
    </tr>
  );
}
