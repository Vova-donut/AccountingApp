import React, { useState } from "react";

export default function AddTransactionForm({ customerId, customerName, onAdd }) {
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!date || !category || !amount) return;
    onAdd({ customerId, customerName, date, category, amount });
    setDate(""); setCategory(""); setAmount("");
  };

  return (
    <form onSubmit={submit} style={{ display:"flex", gap:8, flexWrap:"wrap", margin:"8px 0" }}>
      <input className="input" type="date" value={date} onChange={e=>setDate(e.target.value)} />
      <input className="input" placeholder="Category" value={category} onChange={e=>setCategory(e.target.value)} />
      <input className="input" type="number" step="0.01" placeholder="Amount" value={amount} onChange={e=>setAmount(e.target.value)} />
      <button className="btn btn-primary" type="submit">Add</button>
    </form>
  );
}
