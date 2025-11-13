import React, { useEffect, useState } from "react";
import { repo } from "../utils/storage";
import CategoryRow from "./CategoryRow";
import "../App.css";

export default function AdminPanel() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    const unsub = repo.subscribe(setItems);
    return () => unsub();
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    const n = name.trim();
    if (!n) return;
    await repo.create({ name: n });
    setName("");
  }

  const activeItems = items.filter(c => !c.isDeleted);

  return (
    <div className="page">
      <h1 className="title">Category Management</h1>

      <form className="formRow card" onSubmit={handleAdd}>
        <input
          className="input"
          placeholder="Enter category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="btn primary" type="submit">Add</button>
      </form>

      <div className="card">
        <table className="table">
          <thead>
            <tr><th>Category</th></tr>
          </thead>
        <tbody>
          {activeItems.map(c => <CategoryRow key={c.id} category={c} />)}
          {activeItems.length === 0 && (
            <tr><td className="empty">No categories yet.</td></tr>
          )}
        </tbody>
        </table>
      </div>
    </div>
  );
}
