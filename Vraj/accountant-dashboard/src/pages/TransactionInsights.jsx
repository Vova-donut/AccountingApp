import { useMemo, useState } from 'react'
import KpiCard from '../components/KpiCard'
import { transactions, categories } from '../utils/mockData'

export default function TransactionInsights() {
  const [range, setRange] = useState({ from: '2025-10-01', to: '2025-11-07' })

  const filtered = useMemo(() => {
    const from = new Date(range.from)
    const to = new Date(range.to)
    return transactions.filter(t => {
      const d = new Date(t.date)
      return d >= from && d <= to
    })
  }, [range])

  const kpis = useMemo(() => {
    const inflow = filtered.filter(t => t.amount > 0).reduce((a, b) => a + b.amount, 0)
    const outflow = filtered.filter(t => t.amount < 0).reduce((a, b) => a + Math.abs(b.amount), 0)
    const net = inflow - outflow
    return { inflow, outflow, net }
  }, [filtered])

  const topCats = useMemo(() => {
    const map = {}
    filtered.forEach(t => {
      const key = t.category || 'Uncategorized'
      map[key] = (map[key] || 0) + Math.abs(t.amount)
    })
    return Object.entries(map).sort((a,b)=>b[1]-a[1]).slice(0,5)
  }, [filtered])

  return (
    <section>
      <header className="page-header">
        <h1>Transaction Insights</h1>
        <div className="filters">
          <label>From
            <input type="date" value={range.from}
              onChange={e=>setRange(r=>({...r, from: e.target.value}))}/>
          </label>
          <label>To
            <input type="date" value={range.to}
              onChange={e=>setRange(r=>({...r, to: e.target.value}))}/>
          </label>
        </div>
      </header>

      <div className="kpi-grid">
        <KpiCard title="Total Inflow" value={`NZD ${kpis.inflow.toFixed(2)}`} />
        <KpiCard title="Total Outflow" value={`NZD ${kpis.outflow.toFixed(2)}`} />
        <KpiCard title="Net" value={`NZD ${kpis.net.toFixed(2)}`} hint={kpis.net >= 0 ? 'Positive' : 'Negative'} />
      </div>

      <div className="panel">
        <h2>Top Categories</h2>
        <ul className="list">
          {topCats.map(([name, amt])=>(
            <li key={name}>
              <span>{name}</span>
              <span>NZD {amt.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="panel">
        <h2>30-Day Trend (stub)</h2>
        <div className="chart-stub" aria-label="Trend chart placeholder">
          Add Recharts/Chart.js here later.
        </div>
      </div>
    </section>
  )
}
