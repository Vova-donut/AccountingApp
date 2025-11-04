import React from "react";

export default function ConfirmDialog({ open, title = "Are you sure?", message, confirmText = "Confirm", cancelText = "Cancel", onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="modal_backdrop" onClick={onCancel}>
      <div className="modal_card" onClick={e => e.stopPropagation()}>
        <h3 style={{ marginTop: 0 }}>{title}</h3>
        {message && <p className="muted" style={{ marginTop: -8 }}>{message}</p>}
        <div className="row gap" style={{ justifyContent: "flex-end", marginTop: 16 }}>
          <button className="btn" onClick={onCancel}>{cancelText}</button>
          <button className="btn danger" onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
}
