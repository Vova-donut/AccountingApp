import React from "react";

export default function Filters({ type, setType, category, setCategory, period, setPeriod }) {
  return (
    <div className="filters">
      <label>
        Type:
        <select className="input" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </label>

      <label>
        Category:
        <input className="input"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g., Rent"
        />
      </label>

      <label>
        Period:
        <select className="input" value={period} onChange={(e) => setPeriod(e.target.value)}>
          <option value="year">This Year</option>
          <option value="quarter">This Quarter</option>
          <option value="month">This Month</option>
        </select>
      </label>
    </div>
  );
}
