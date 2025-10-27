import React, { useMemo, useState } from "react";

export function TransactionModal({ typeDefault="expense", categories, onClose, onSubmit }){
  /* local form state */
  const [form, setForm] = useState({
    amount:"", date: new Date().toISOString().slice(0,10),
    type: typeDefault, categoryId:"", note:""
  });
  const [touched, setTouched] = useState(false);

  /* filter categories by type (income/expense) */
  const catsByType = useMemo(
    () => categories.filter(c=>c.type===form.type),
    [categories, form.type]
  );

  /* simple validation rules */
  const errors = useMemo(()=>{
    const e = {};
    if (!form.amount || Number(form.amount)<=0) e.amount = "Amount must be greater than 0";
    if (!form.categoryId) e.categoryId = "Category is required";
    if (!form.date) e.date = "Date is required";
    return e;
  },[form]);

  /* generic handlers */
  function handleChange(e){ const {name,value}=e.target; setForm(p=>({...p,[name]:value})); }
  function handleTypeChange(e){ const v=e.target.value; setForm(p=>({...p,type:v,categoryId:""})); }

  /* submit to parent (will add row) */
  function submit(){
    setTouched(true);
    if (Object.keys(errors).length>0) return;
    onSubmit({ ...form, amount:Number(form.amount) });
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <h3>Add {form.type}</h3>

        <div className="form-grid">
          {/* Type switch */}
          <div className="full">
            <div style={{display:"flex", gap:12}}>
              <label><input type="radio" name="type" value="income" checked={form.type==="income"} onChange={handleTypeChange}/> Income</label>
              <label><input type="radio" name="type" value="expense" checked={form.type==="expense"} onChange={handleTypeChange}/> Expense</label>
            </div>
            <div className="help">Choose the transaction type.</div>
          </div>

          {/* Amount */}
          <div>
            <label>Amount</label>
            <input className="input" name="amount" type="number" step="0.01" min="0.01" placeholder="0.00" value={form.amount} onChange={handleChange}/>
            {touched && errors.amount && <div className="error">{errors.amount}</div>}
          </div>

          {/* Date */}
          <div>
            <label>Date</label>
            <input className="input" name="date" type="date" value={form.date} onChange={handleChange}/>
            {touched && errors.date && <div className="error">{errors.date}</div>}
          </div>

          {/* Category */}
          <div className="full">
            <label>Category</label>
            <select className="select" name="categoryId" value={form.categoryId} onChange={handleChange}>
              <option value="">Select category</option>
              {catsByType.map(c=> <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            {touched && errors.categoryId && <div className="error">{errors.categoryId}</div>}
          </div>

          {/* Note */}
          <div className="full">
            <label>Note (optional)</label>
            <input className="input" name="note" placeholder="e.g., invoice #1042" value={form.note} onChange={handleChange}/>
          </div>
        </div>

        {/* Actions */}
        <div style={{display:"flex", justifyContent:"flex-end", gap:12, marginTop:16}}>
          <button className="btn btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={submit}>Save</button>
        </div>
      </div>
    </div>
  );
}