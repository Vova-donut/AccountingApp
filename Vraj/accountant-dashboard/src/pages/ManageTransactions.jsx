import { useMemo, useState } from 'react'
import { transactions } from '../utils/mockData'
import { exportCsv } from '../utils/csv'

export default function ManageTransactions() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('All')

  const data = useMemo(()=>{
    return transactions.filter(t=>{
      const matchesQ = q ? (t.customer.toLowerCase().includes(q.toLowerCase()) || (t.notes||'').toLowerCase().includes(q.toLowerCase())) : true
      const matchesC = cat==='All' ? true : (t.category===cat)
      return matchesQ && matchesC
    })
  },[q,cat])

  const categories = Array.from(new Set(transactions.map(t=>t.category))).filter(Boolean)

  const onExport = () => exportCsv('transactions.csv', data)

  const inlineEdit = (id, field, value) => {
    // stub: send PATCH to backend
    alert(`Updated ${field} on tx ${id} to "${value}"`)
  }

  return (
    <section>
      <header className="page-header">
        <h1>Manage Transactions</h1>
        <div className="filters">
          <input placeholder="Search customer or notes…" value={q} onChange={e=>setQ(e.target.value)} aria-label="Search"/>
          <select value={cat} onChange={e=>setCat(e.target.value)} aria-label="Filter by category">
            <option>All</option>
            {categories.map(c=><option key={c}>{c}</option>)}
          </select>
          <button onClick={onExport}>Export CSV</button>
        </div>
      </header>

      <div className="table">
        <div className="thead">
          <div>Date</div><div>Customer</div><div>Category</div><div>Amount</div><div>Notes</div>
        </div>
        {data.map(t=>(
          <div className="trow" key={t.id}>
            <div>{t.date}</div>
            <div>{t.customer}</div>
            <div>
              <input defaultValue={t.category} onBlur={e=>inlineEdit(t.id,'category',e.target.value)} aria-label={`Edit category for ${t.id}`}/>
            </div>
            <div>{t.amount.toFixed(2)}</div>
            <div>
              <input defaultValue={t.notes||''} onBlur={e=>inlineEdit(t.id,'notes',e.target.value)} aria-label={`Edit notes for ${t.id}`}/>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
