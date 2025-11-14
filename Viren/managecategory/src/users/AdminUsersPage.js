import { useEffect, useMemo, useState } from "react";
import { userStore } from "../utils/userStore";

const ROLES = ["admin","manager","customer"];

export default function AdminUsersPage() {
  const [rows,setRows]=useState([]);
  const [search,setSearch]=useState("");
  const [busyId,setBusyId]=useState(null);

  useEffect(()=>{ const unsub=userStore.subscribe(setRows); return ()=>unsub(); },[]);

  const filtered=useMemo(()=>{
    const s=search.trim().toLowerCase();
    if(!s) return rows;
    return rows.filter(r=>
      (r.email||"").toLowerCase().includes(s)||
      (r.role||"").toLowerCase().includes(s)||
      (r.status||"").toLowerCase().includes(s)
    );
  },[rows,search]);

  async function changeRole(id,role){ setBusyId(id); try{ await userStore.update(id,{role}); } finally{ setBusyId(null);} }
  async function toggleBlock(id,status,email){
    const next=status==="active"?"blocked":"active";
    const verb=next==="blocked"?"block":"unblock";
    if(!window.confirm(`Are you sure you want to ${verb} ${email}?`)) return;
    setBusyId(id);
    try{ await userStore.update(id,{status:next}); } finally{ setBusyId(null);}
  }

  return (
    <div className="page">
      <h1 className="title">User Management</h1>

      <div className="card toolbar">
        <div className="left">
          <input className="input" placeholder="Search email / role / status"
            value={search} onChange={e=>setSearch(e.target.value)} />
        </div>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr><th>Email</th><th>Role</th><th>Status</th><th>Created</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filtered.map(u=>(
              <tr key={u.id}>
                <td>{u.email}</td>
                <td>
                  <select className="input-sm" value={u.role}
                    disabled={busyId===u.id} onChange={e=>changeRole(u.id,e.target.value)}>
                    {ROLES.map(r=><option key={r} value={r}>{r}</option>)}
                  </select>
                </td>
                <td>
                  <span style={{
                    background:u.status==="active"?"#e9f7ef":"#fdecea",
                    border:"1px solid #DBDBDB",padding:"2px 8px",borderRadius:999
                  }}>{u.status}</span>
                </td>
                <td>{new Date(u.createdAt).toLocaleString()}</td>
                <td>
                  <button className={u.status==="active"?"btn danger":"btn primary"}
                    disabled={busyId===u.id}
                    onClick={()=>toggleBlock(u.id,u.status,u.email)}>
                    {u.status==="active"?"Block":"Unblock"}
                  </button>
                </td>
              </tr>
            ))}
            {!filtered.length && <tr><td colSpan="5" className="empty">No users found</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
