import React from "react";

export default function ConfirmDialog({ open, title, message, confirmText = "Confirm", cancelText = "Cancel", onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="modal_backdrop" role="dialog" aria-modal="true">
      <div className="modal_card">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="row gap">
          <button className="btn" onClick={onCancel}>{cancelText}</button>
          <button className="btn danger" onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
}
