// src/App.js
import React, { useEffect, useMemo, useState } from "react";

/**
 * Admin Category CRUD + Customer View (single-file demo)
 * Theming based on your palette:
 * - Primary:   #1F4E79 (headers, buttons, highlights)
 * - Secondary: #5DADE2 (links, hovers, subtle accents)
 * - BG:        #EAEAEA (page background)
 * - Card:      #FFFFFF
 * - Border:    #DBDBDB
 * - Text:      #000000
 * - Success:   #27AE60
 * - Error:     #C0392B
 */

export default function App() {
  // ---------- Local Storage Helpers ----------
  const LS_KEYS = {
    categories: "categories_v1",
    transactions: "transactions_v1",
  };

  const loadLS = (key, fallback) => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  };
  const saveLS = (key, value) => localStorage.setItem(key, JSON.stringify(value));

  // ---------- State ----------
  const [categories, setCategories] = useState(() =>
    loadLS(LS_KEYS.categories, [
      { id: "c-1", name: "Food" },
      { id: "c-2", name: "Transport" },
      { id: "c-3", name: "Utilities" },
    ])
  );

  const [transactions, setTransactions] = useState(() =>
    loadLS(LS_KEYS.transactions, [
      { id: "t-1", note: "Lunch", categoryId: "c-1", categoryName: "Food", amount: 12.5 },
      { id: "t-2", note: "Bus card", categoryId: "c-2", categoryName: "Transport", amount: 5.0 },
    ])
  );

  // Admin controls
  const [newCatName, setNewCatName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [feedback, setFeedback] = useState({ type: "", msg: "" }); // success/error flash

  // Customer simulation controls
  const [selectedCatId, setSelectedCatId] = useState("");
  const [txnNote, setTxnNote] = useState("");
  const [txnAmount, setTxnAmount] = useState("");

  // ---------- Effects ----------
  useEffect(() => saveLS(LS_KEYS.categories, categories), [categories]);
  useEffect(() => saveLS(LS_KEYS.transactions, transactions), [transactions]);
  useEffect(() => {
    if (!feedback.msg) return;
    const t = setTimeout(() => setFeedback({ type: "", msg: "" }), 1800);
    return () => clearTimeout(t);
  }, [feedback]);

  // ---------- Derived ----------
  const categoryMap = useMemo(() => {
    const map = new Map();
    categories.forEach((c) => map.set(c.id, c.name));
    return map;
  }, [categories]);

  // ---------- Admin Actions ----------
  const addCategory = () => {
    const name = newCatName.trim();
    if (!name) return;
    const exists = categories.some((c) => c.name.toLowerCase() === name.toLowerCase());
    if (exists) {
      setFeedback({ type: "error", msg: "Category already exists." });
      return;
    }
    const id = `c-${Date.now()}`;
    setCategories((prev) => [...prev, { id, name }]);
    setNewCatName("");
    setFeedback({ type: "success", msg: "Category added." });
  };

  const startEdit = (cat) => {
    setEditingId(cat.id);
    setEditName(cat.name);
  };

  const saveEdit = (id) => {
    const name = editName.trim();
    if (!name) return;

    const exists = categories.some(
      (c) => c.id !== id && c.name.toLowerCase() === name.toLowerCase()
    );
    if (exists) {
      setFeedback({ type: "error", msg: "Another category already has that name." });
      return;
    }

    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, name } : c)));
    setEditingId(null);
    setEditName("");
    setFeedback({ type: "success", msg: "Category updated." });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
  };

  const deleteCategory = (id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    setSelectedCatId((prev) => (prev === id ? "" : prev));
    setFeedback({ type: "success", msg: "Category deleted." });
  };

  // ---------- Customer Actions ----------
  const addTransaction = () => {
    const note = txnNote.trim();
    const amount = parseFloat(txnAmount);
    if (!selectedCatId) return setFeedback({ type: "error", msg: "Choose a category." });
    if (!note) return setFeedback({ type: "error", msg: "Add a note/description." });
    if (Number.isNaN(amount)) return setFeedback({ type: "error", msg: "Enter a valid amount." });

    const catNameSnapshot = categoryMap.get(selectedCatId) || "(deleted category)";
    const id = `t-${Date.now()}`;
    setTransactions((prev) => [
      ...prev,
      { id, note, categoryId: selectedCatId, categoryName: catNameSnapshot, amount },
    ]);
    setTxnNote("");
    setTxnAmount("");
    setFeedback({ type: "success", msg: "Transaction saved." });
  };

  // ---------- Theme ----------
  const colors = {
    primary: "#1F4E79",
    secondary: "#5DADE2",
    bg: "#EAEAEA",
    card: "#FFFFFF",
    border: "#DBDBDB",
    text: "#000000",
    success: "#27AE60",
    error: "#C0392B",
  };

  // ---------- Styles ----------
  const styles = {
    page: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "24px",
      minHeight: "100vh",
      padding: "24px",
      background: colors.bg,
      color: colors.text,
      fontFamily: "Inter, system-ui, Arial, sans-serif",
    },
    card: {
      background: colors.card,
      border: `1px solid ${colors.border}`,
      borderRadius: 16,
      boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
      padding: "20px",
    },
    headerWrap: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 8,
    },
    h1: { margin: 0, fontSize: 22, color: colors.primary },
    subtitle: { marginTop: 2, fontSize: 13, color: "#3a3a3a" },
    sectionTitle: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      margin: "14px 0 6px",
      color: colors.primary,
      fontWeight: 600,
    },
    badge: {
      fontSize: 11,
      padding: "2px 8px",
      background: "#F0F7FD",
      color: colors.primary,
      border: `1px solid ${colors.secondary}`,
      borderRadius: 999,
    },
    row: { display: "flex", gap: 8, alignItems: "center", marginTop: 10 },
    input: {
      padding: "10px 12px",
      borderRadius: 10,
      border: `1px solid ${colors.border}`,
      outline: "none",
      flex: 1,
      color: colors.text,
      background: "#fff",
    },
    select: {
      padding: "10px 12px",
      borderRadius: 10,
      border: `1px solid ${colors.border}`,
      outline: "none",
      background: "#fff",
      color: colors.text,
      flex: 1,
      cursor: "pointer",
    },
    btn: {
      padding: "10px 14px",
      borderRadius: 10,
      border: `1px solid ${colors.primary}`,
      background: colors.primary,
      color: "#fff",
      cursor: "pointer",
      transition: "transform .02s ease, background .2s ease",
    },
    btnGhost: {
      padding: "8px 12px",
      borderRadius: 10,
      border: `1px solid ${colors.border}`,
      background: "#fff",
      color: colors.primary,
      cursor: "pointer",
    },
    btnDanger: {
      padding: "8px 12px",
      borderRadius: 10,
      border: `1px solid ${colors.error}`,
      background: "#fff",
      color: colors.error,
      cursor: "pointer",
    },
    btnText: {
      background: "transparent",
      border: "none",
      color: colors.secondary,
      cursor: "pointer",
      textDecoration: "underline",
      padding: 0,
      fontSize: 14,
    },
    list: { marginTop: 14, display: "grid", gap: 10 },
    chip: {
      display: "inline-block",
      padding: "6px 10px",
      borderRadius: 999,
      background: "#F0F7FD",
      color: colors.primary,
      border: `1px solid ${colors.secondary}`,
      fontSize: 12,
      fontWeight: 600,
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: 12,
      borderTop: `1px solid ${colors.border}`,
    },
    thtd: {
      borderBottom: `1px solid ${colors.border}`,
      textAlign: "left",
      padding: "10px 8px",
      fontSize: 14,
    },
    feedback: {
      minHeight: 26,
      marginTop: 8,
      fontSize: 13,
      fontWeight: 600,
      color:
        feedback.type === "success"
          ? colors.success
          : feedback.type === "error"
          ? colors.error
          : "transparent",
    },
    hint: { fontSize: 12, color: "#444", marginTop: 6 },
  };

  return (
    <div style={styles.page}>
      {/* ADMIN SIDE */}
      <section style={styles.card}>
        <div style={styles.headerWrap}>
          <h1 style={styles.h1}>Admin: Manage Categories</h1>
          <span style={styles.badge}>CRUD</span>
        </div>
        <div style={styles.subtitle}>Create, edit, and delete categories.</div>

        <div style={styles.sectionTitle}>Add new category</div>
        <div style={styles.row}>
          <input
            style={styles.input}
            placeholder="e.g., Entertainment"
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addCategory()}
          />
          <button
            style={styles.btn}
            onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.99)")}
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            onClick={addCategory}
          >
            Add
          </button>
        </div>

        <div style={styles.sectionTitle}>Existing categories</div>
        <div style={styles.list}>
          {categories.length === 0 && (
            <div style={{ color: "#6b7280", fontSize: 14 }}>No categories yet.</div>
          )}
          {categories.map((cat) => (
            <CategoryRow
              key={cat.id}
              cat={cat}
              editingId={editingId}
              editName={editName}
              onStartEdit={() => startEdit(cat)}
              onChangeEdit={setEditName}
              onSave={() => saveEdit(cat.id)}
              onCancel={cancelEdit}
              onDelete={() => deleteCategory(cat.id)}
              styles={styles}
            />
          ))}
        </div>

        <div style={styles.feedback}>{feedback.msg || " "}</div>
      </section>

      {/* CUSTOMER SIDE */}
      <section style={styles.card}>
        <div style={styles.headerWrap}>
          <h1 style={styles.h1}>Customer: Record Transaction</h1>
          <span style={styles.badge}>Live dropdown</span>
        </div>
        <div style={styles.subtitle}>Customers see the latest categories instantly.</div>

        <div style={styles.sectionTitle}>Choose category</div>
        <div style={styles.row}>
          <select
            style={styles.select}
            value={selectedCatId}
            onChange={(e) => setSelectedCatId(e.target.value)}
          >
            <option value="">-- Select category --</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <span style={styles.chip}>
            {categories.length} active {categories.length === 1 ? "category" : "categories"}
          </span>
        </div>

        <div style={styles.sectionTitle}>Details</div>
        <div style={styles.row}>
          <input
            style={styles.input}
            placeholder="Note (e.g., 'Coffee')"
            value={txnNote}
            onChange={(e) => setTxnNote(e.target.value)}
          />
          <input
            style={styles.input}
            placeholder="Amount (e.g., 4.50)"
            value={txnAmount}
            onChange={(e) => setTxnAmount(e.target.value)}
          />
          <button
            style={styles.btn}
            onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.99)")}
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            onClick={addTransaction}
          >
            Save
          </button>
        </div>

        <div style={styles.hint}>
          Deleted categories will no longer appear in this dropdown, but old transactions will still
          show the saved category name.
        </div>

        <div style={styles.sectionTitle}>Recent transactions</div>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.thtd}>Note</th>
              <th style={styles.thtd}>Category (snapshot)</th>
              <th style={styles.thtd}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 && (
              <tr>
                <td style={styles.thtd} colSpan={3}>
                  — No transactions yet —
                </td>
              </tr>
            )}
            {transactions.map((t) => (
              <tr key={t.id}>
                <td style={styles.thtd}>{t.note}</td>
                <td style={styles.thtd}>
                  {categoryMap.has(t.categoryId) ? (
                    t.categoryName
                  ) : (
                    <span title="This category was deleted">
                      <em>(deleted)</em> {t.categoryName}
                    </span>
                  )}
                </td>
                <td style={styles.thtd}>${Number(t.amount).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

// --------- Category Row ---------
function CategoryRow({
  cat,
  editingId,
  editName,
  onStartEdit,
  onChangeEdit,
  onSave,
  onCancel,
  onDelete,
  styles,
}) {
  const isEditing = editingId === cat.id;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isEditing ? "1fr auto auto" : "1fr auto auto",
        gap: 8,
        alignItems: "center",
      }}
    >
      {isEditing ? (
        <input
          autoFocus
          style={styles.input}
          value={editName}
          onChange={(e) => onChangeEdit(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSave();
            if (e.key === "Escape") onCancel();
          }}
        />
      ) : (
        <div style={{ fontSize: 15 }}>{cat.name}</div>
      )}

      {isEditing ? (
        <>
          <button style={styles.btn} onClick={onSave}>
            Save
          </button>
          <button style={styles.btnGhost} onClick={onCancel}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <button style={styles.btnGhost} onClick={onStartEdit}>
            Edit
          </button>
          <button style={styles.btnDanger} onClick={onDelete} title="Delete category">
            Delete
          </button>
        </>
      )}
    </div>
  );
}
