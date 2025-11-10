export default function KpiCard({ title, value, hint }) {
  return (
    <div className="kpi-card" role="group" aria-label={`${title} metric`}>
      <div className="kpi-title">{title}</div>
      <div className="kpi-value">{value}</div>
      {hint && <div className="kpi-hint">{hint}</div>}
    </div>
  )
}
