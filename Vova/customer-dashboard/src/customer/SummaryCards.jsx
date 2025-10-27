import React from "react";

/* NZD formatter for proper currency display */
const nzd = new Intl.NumberFormat("en-NZ", { style:"currency", currency:"NZD" });

export function SummaryCards({ totals }) {
  return (
    <div className="summary">
      {/* Total income */}
      <div className="card">
        <h3>Total income</h3>
        <div className="amount">{nzd.format(totals.income)}</div>
      </div>

      {/* Total expense */}
      <div className="card">
        <h3>Total expense</h3>
        <div className="amount">{nzd.format(totals.expense)}</div>
      </div>

      {/* Balance */}
      <div className="card">
        <h3>Balance</h3>
        <div className="amount">{nzd.format(totals.balance)}</div>
      </div>
    </div>
  );
}