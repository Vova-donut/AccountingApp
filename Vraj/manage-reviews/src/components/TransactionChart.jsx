import React from "react";

export default function TransactionChart({ data }) {
  const source = Array.isArray(data) ? data : [];
  const normalized = source
    .map(d => ({ date: String(d?.date ?? ""), amount: Number(d?.amount ?? 0) }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  if (normalized.length === 0) {
    return (
      <div className="chart-box">
        <h4 style={{ color: "#1A2747", marginBottom: 8 }}>Spending Overview</h4>
        <p>No transaction data to show.</p>
      </div>
    );
  }

  const max = Math.max(...normalized.map(d => d.amount), 1);
  const BAR_MAX_H = 140;

  return (
    <div className="chart-box">
      <h4 style={{ color: "#1A2747", marginBottom: 8 }}>Spending Overview</h4>
      <div className="mini-chart">
        <div className="mini-bars" style={{ height: BAR_MAX_H }}>
          {normalized.map((d) => {
            const h = Math.round((d.amount / max) * BAR_MAX_H);
            return (
              <div key={d.date} className="mini-bar" title={`${d.date} • $${d.amount.toFixed(2)}`} style={{ height: h }} />
            );
          })}
        </div>
        <div className="mini-labels">
          {normalized.map((d) => (
            <div key={d.date} className="mini-label" title={d.date}>{d.date}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
