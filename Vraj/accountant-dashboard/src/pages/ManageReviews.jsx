import { useMemo, useState } from 'react'
import { reviews } from '../utils/mockData'

export default function ManageReviews() {
  const [status, setStatus] = useState('All')
  const data = useMemo(
    () => reviews.filter(r => status==='All' ? true : r.status===status),
    [status]
  )

  const update = (id, next) => {
    // stub: would POST/PATCH to API
    alert(`Review ${id} set to ${next}`)
  }

  return (
    <section>
      <header className="page-header">
        <h1>Manage Reviews</h1>
        <select value={status} onChange={e=>setStatus(e.target.value)} aria-label="Filter by status">
          <option>All</option><option>Open</option><option>Resolved</option><option>Flagged</option>
        </select>
      </header>

      <div className="table">
        <div className="thead">
          <div>ID</div><div>Customer</div><div>Note</div><div>Status</div><div>Actions</div>
        </div>
        {data.map(r=>(
          <div className="trow" key={r.id}>
            <div>{r.id}</div>
            <div>{r.customer}</div>
            <div>{r.note}</div>
            <div><span className={`chip ${r.status.toLowerCase()}`}>{r.status}</span></div>
            <div className="actions">
              <button onClick={()=>update(r.id,'Approved')} aria-label={`Approve review ${r.id}`}>Approve</button>
              <button onClick={()=>update(r.id,'Rejected')} aria-label={`Reject review ${r.id}`}>Reject</button>
              <button onClick={()=>update(r.id,'Resolved')} aria-label={`Resolve review ${r.id}`}>Resolve</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
