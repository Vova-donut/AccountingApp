import React, { useState } from "react";

export default function CommentModal({ open, onClose, onSubmit }) {
  const [text, setText] = useState("");
  if (!open) return null;

  const submit = () => {
    if (!text.trim()) return;
    onSubmit(text.trim());
    setText("");
  };

  return (
    <div style={backdrop}>
      <div style={modal}>
        <h3 style={{ marginTop: 0 }}>Add Comment</h3>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Helpful, short advice to optimize spend…"
          rows={4}
          maxLength={200}
          style={{ width: "100%", padding: 8, resize: "vertical" }}
        />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 8 }}>
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={submit}>Save</button>
        </div>
        <small>{200 - text.length} chars left</small>
      </div>
    </div>
  );
}

const backdrop = { position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 };
const modal = { background: "#fff", padding: 16, borderRadius: 12, width: 420, maxWidth: "92%" };
