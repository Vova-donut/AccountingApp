import React from "react";

export default function Filters({
  customers = [],
  customerId = "",
  setCustomerId = () => {},
  type,
  setType,
  category,
  setCategory,
  period,
  setPeriod,
}) {
  return (
    <div className="filters">
      <label>
        Customer:
        <select
          className="input"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        >
          {customers.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </label>

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
