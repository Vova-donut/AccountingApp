import React, { useEffect, useState } from "react";
import { repo } from "../utils/storage";

export default function CategoryRow({ category }) {
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({
    name: category.name,
    type: category.type,
    active: category.active,
  });

  useEffect(() => {
    setForm({
      name: category.name,
      type: category.type,
      active: category.active,
    });
  }, [category]);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function save() {
    const n = form.name.trim();
    if (!n) return;
    await repo.update(category.id, {
      name: n,
      type: form.type,
      active: form.active,
    });
    setEdit(false);
  }

  async function remove() {
    if (!window.confirm(`Disable "${category.name}"? Users will no longer see it.`)) return;
    await repo.softDelete(category.id);
  }

  function cancel() {
    setForm({
      name: category.name,
      type: category.type,
      active: category.active,
    });
    setEdit(false);
  }

  const createdAt = category.createdAt
    ? new Date(category.createdAt).toLocaleString()
    : "--";
  const statusLabel = category.active ? "Active" : "Hidden";

  if (edit) {
    return (
      <tr>
        <td>
          <input
            className="input"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </td>
        <td>
          <select
            className="input"
            value={form.type}
            onChange={(e) => handleChange("type", e.target.value)}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </td>
        <td>
          <label style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => handleChange("active", e.target.checked)}
            />
            {form.active ? "Active" : "Hidden"}
          </label>
        </td>
        <td>{createdAt}</td>
        <td>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button className="btn primary" onClick={save} type="button">Save</button>
            <button className="btn secondary" onClick={cancel} type="button">Cancel</button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td>{category.name}</td>
      <td style={{ textTransform: "capitalize" }}>{category.type}</td>
      <td>
        <span
          style={{
            padding: "4px 10px",
            borderRadius: 999,
            background: category.active ? "rgba(46, 204, 113, 0.15)" : "rgba(0,0,0,0.08)",
            color: category.active ? "#1f7a4d" : "#555",
            fontWeight: 600,
            fontSize: 13,
          }}
        >
          {statusLabel}
        </span>
      </td>
      <td>{createdAt}</td>
      <td>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button className="btn secondary" onClick={() => setEdit(true)}>Edit</button>
          <button
            className="btn danger"
            onClick={remove}
            disabled={!category.active}
            style={!category.active ? { opacity: 0.5, cursor: "not-allowed" } : undefined}
          >
            {category.active ? "Disable" : "Hidden"}
          </button>
        </div>
      </td>
    </tr>
  );
}
