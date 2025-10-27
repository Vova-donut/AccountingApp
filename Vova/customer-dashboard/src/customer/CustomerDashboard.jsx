import React, { useMemo, useState } from "react";
import "./ui-theme.css";
import { SummaryCards } from "./SummaryCards";
import { TransactionsTable } from "./TransactionsTable";
import { TransactionModal } from "./TransactionModal";

/* demo categories (later replace by Firestore) */
const DEMO_CATEGORIES = [
  { id:"cat_sales", name:"Sales", type:"income" },
  { id:"cat_consulting", name:"Consulting", type:"income" },
  { id:"cat_rent", name:"Rent", type:"expense" },
  { id:"cat_fuel", name:"Fuel", type:"expense" },
];

/* demo rows to make table non-empty */
const seed = [
  { id:"t1", type:"income",  date:"2025-10-01", categoryId:"cat_sales",      category:"Sales",      note:"INV-1042",     amount:850.00 },
  { id:"t2", type:"expense", date:"2025-10-02", categoryId:"cat_rent",       category:"Rent",       note:"Office Oct",   amount:420.00 },
  { id:"t3", type:"expense", date:"2025-10-03", categoryId:"cat_fuel",       category:"Fuel",       note:"Client visit", amount:65.30 },
  { id:"t4", type:"income",  date:"2025-10-05", categoryId:"cat_consulting", category:"Consulting", note:"ACME Ltd",      amount:600.00 },
];

export default function CustomerDashboard(){
  const [rows, setRows] = useState(seed);
  const [filters, setFilters] = useState({ type:"all", category:"all", period:"this-month" });
  const [modal, setModal] = useState({ open:false, type:"expense" });

  /* filter rows by current controls */
  const filtered = useMemo(()=>{
    return rows.filter(r=>{
      if (filters.type!=="all" && r.type!==filters.type) return false;
      if (filters.category!=="all" && r.categoryId!==filters.category) return false;
      return true;
    });
  },[rows, filters]);

  /* compute totals (reactive) */
  const totals = useMemo(()=>{
    const income = filtered.filter(r=>r.type==="income").reduce((s,r)=>s+r.amount,0);
    const expense = filtered.filter(r=>r.type==="expense").reduce((s,r)=>s+r.amount,0);
    return { income, expense, balance: income - expense };
  },[filtered]);

  /* create/edit/delete handlers */
  function handleCreate(tx){
    setRows(prev => [
      { id:crypto.randomUUID(), ...tx, category: DEMO_CATEGORIES.find(c=>c.id===tx.categoryId)?.name || "" },
      ...prev
    ]);
    setModal({ open:false, type:"expense" });
  }
  function handleDelete(id){ setRows(prev => prev.filter(r=>r.id!==id)); }
  function handleEdit(id, patch){
    setRows(prev => prev.map(r =>
      r.id===id ? { ...r, ...patch, category: DEMO_CATEGORIES.find(c=>c.id===patch.categoryId)?.name || r.category } : r
    ));
  }

  return (
    <div className="app-shell">
      {/* top bar */}
      <div className="app-bar">
        <div className="app-title">Customer Dashboard</div>
        <div className="actions">
          <button className="btn btn-outline" onClick={()=>setModal({open:true, type:"income"})}>Add income</button>
          <button className="btn btn-primary" onClick={()=>setModal({open:true, type:"expense"})}>Add expense</button>
        </div>
      </div>

      {/* summary cards */}
      <SummaryCards totals={totals} />

      {/* simple filters (local only for now) */}
      <div className="filters">
        <select className="select" value={filters.period} onChange={e=>setFilters(f=>({...f, period:e.target.value}))}>
          <option value="this-month">This month</option>
          <option value="last-month">Last month</option>
          <option value="this-year">This year</option>
          <option value="custom" disabled>Custom (v2)</option>
        </select>
        <select className="select" value={filters.type} onChange={e=>setFilters(f=>({...f, type:e.target.value}))}>
          <option value="all">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select className="select" value={filters.category} onChange={e=>setFilters(f=>({...f, category:e.target.value}))}>
          <option value="all">All categories</option>
          {DEMO_CATEGORIES.map(c=> <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      {/* data table */}
      <TransactionsTable rows={filtered} onDelete={handleDelete} onEdit={handleEdit} />

      {/* add/edit modal */}
      {modal.open && (
        <TransactionModal
          typeDefault={modal.type}
          categories={DEMO_CATEGORIES}
          onClose={()=>setModal({open:false, type:"expense"})}
          onSubmit={handleCreate}
        />
      )}
    </div>
  );
}