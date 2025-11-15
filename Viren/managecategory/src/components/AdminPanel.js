import React, { useEffect, useState } from "react";
import { repo } from "../utils/storage";
import CategoryRow from "./CategoryRow";
import "../App.css";

export default function AdminPanel() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("expense");
  const [active, setActive] = useState(true);

  useEffect(() => {
    const unsub = repo.subscribe(setItems);
    return () => unsub();
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    const n = name.trim();
    if (!n) return;
    await repo.create({ name: n, type, active });
    setName("");
    setType("expense");
    setActive(true);
  }

  return (
    <div className="page">
      <h1 className="title">Category Management</h1>

      <form className="formRow card" onSubmit={handleAdd} style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        <input
          className="input"
          placeholder="Enter category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ flex: "1 1 200px" }}
        />
        <select
          className="input"
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{ flex: "0 1 140px" }}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <label style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <input
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
          />
          Active
        </label>
        <button className="btn primary" type="submit">Add</button>
      </form>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
        <tbody>
          {items.map(c => <CategoryRow key={c.id} category={c} />)}
          {items.length === 0 && (
            <tr><td className="empty" colSpan={5}>No categories yet.</td></tr>
          )}
        </tbody>
        </table>
      </div>
    </div>
  );
}
