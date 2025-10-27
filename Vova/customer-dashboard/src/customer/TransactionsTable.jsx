import React from "react";

const nzd = new Intl.NumberFormat("en-NZ",{ style:"currency", currency:"NZD" });

export function TransactionsTable({ rows, onDelete, onEdit }){
  return (
    <div className="table card">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Category</th>
            <th>Note</th>
            <th className="td-right">Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* Empty state */}
          {rows.length===0 && (
            <tr>
              <td colSpan={6} style={{padding:"20px", textAlign:"center", color:"#666"}}>
                No transactions yet.
              </td>
            </tr>
          )}

          {/* Rows */}
          {rows.map(r=>(
            <tr key={r.id}>
              <td>{formatDate(r.date)}</td>
              <td><span className={`badge ${r.type}`}>{r.type}</span></td>
              <td>{r.category}</td>
              <td>{r.note}</td>
              <td className="td-right">{nzd.format(r.amount)}</td>
              <td style={{textAlign:"right"}}>
                {/* stub buttons; wire later to Firestore */}
                <button className="btn btn-outline" onClick={()=>onEdit(r.id, r)}>Edit</button>{' '}
                <button className="btn btn-outline" onClick={()=>onDelete(r.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* Helper: NZ local date */
function formatDate(iso){
  const d = new Date(iso);
  return d.toLocaleDateString("en-NZ", { day:"2-digit", month:"short", year:"numeric" });
}