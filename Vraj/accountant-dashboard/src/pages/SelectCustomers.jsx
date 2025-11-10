import { useMemo, useState } from 'react'
import { customers } from '../utils/mockData'

export default function SelectCustomers() {
  const [q, setQ] = useState('')
  const options = useMemo(()=>customers.filter(c=>c.name.toLowerCase().includes(q.toLowerCase())),[q])

  return (
    <section>
      <header className="page-header">
        <h1>Select Customers</h1>
      </header>

      <div className="panel">
        <input placeholder="Search customer…" value={q} onChange={e=>setQ(e.target.value)} aria-label="Search customers"/>
        <div className="list selectable">
          {options.map(c=>(
            <div key={c.id} className="select-row">
              <span>{c.name}</span>
              <a className="btn" href={`/transactions?customer=${encodeURIComponent(c.name)}`}>Filter to this customer</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
