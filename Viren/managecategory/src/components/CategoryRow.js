import React, { useState } from "react";
import { repo } from "../utils/storage";

export default function CategoryRow({ category }) {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(category.name);

  async function save() {
    const n = name.trim();
    if (!n) return;
    await repo.update(category.id, { name: n });
    setEdit(false);
  }

  async function remove() {
    if (!window.confirm(`Delete "${category.name}"?`)) return;
    await repo.softDelete(category.id);
  }

  if (edit) {
    // Edit mode: input + Save + Delete horizontally
    return (
      <tr>
        <td>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <input
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ flex: 1 }}
            />
            <button className="btn primary" onClick={save}>Save</button>
            <button className="btn danger" onClick={remove}>Delete</button>
          </div>
        </td>
      </tr>
    );
  }

  // View mode: name + Edit + Delete (inline right)
  return (
    <tr>
      <td>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ flex: 1 }}>{category.name}</span>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn secondary" onClick={() => setEdit(true)}>Edit</button>
            <button className="btn danger" onClick={remove}>Delete</button>
          </div>
        </div>
      </td>
    </tr>
  );
}

