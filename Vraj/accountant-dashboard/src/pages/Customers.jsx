import { customers } from '../utils/mockData'
import { useNavigate } from 'react-router-dom'

export default function Customers() {
  const nav = useNavigate()
  return (
    <section>
      <header className="page-header">
        <h1>Customers</h1>
      </header>

      <div className="table">
        <div className="thead">
          <div>Name</div><div>Email</div><div>Total Tx</div><div>Total Amount</div><div>Last Active</div>
        </div>
        {customers.map(c=>(
          <div className="trow clickable" key={c.id} onClick={()=>nav(`/transactions?customer=${encodeURIComponent(c.name)}`)}>
            <div>{c.name}</div>
            <div>{c.email}</div>
            <div>{c.totalTx}</div>
            <div>{c.totalAmount.toFixed(2)}</div>
            <div>{c.lastActive}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
