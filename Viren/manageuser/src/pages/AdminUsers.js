import React, { useEffect, useMemo, useState } from "react";
import * as svc from "../services/userService";
import UserTable from "../components/UserTable";
import ConfirmDialog from "../components/ConfirmDialog";

export default function AdminUsers() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [confirm, setConfirm] = useState(null); // { id, action: 'block'|'unblock' }

  async function load() {
    setLoading(true);
    try {
      const data = await svc.listUsers({ search });
      setRows(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);               // initial
  useEffect(() => { const t = setTimeout(load, 300); return () => clearTimeout(t); }, [search]); // debounced search

  async function changeRole(id, role) {
    const prev = rows.slice();
    setRows(rows.map(r => (r.id === id ? { ...r, role } : r)));
    try {
      await svc.updateUserRole(id, role);
    } catch {
      setRows(prev); // rollback if failed
      alert("Failed to update role");
    }
  }

  async function runBlock(id) {
    const prev = rows.slice();
    setRows(rows.map(r => (r.id === id ? { ...r, status: "blocked" } : r)));
    try {
      await svc.blockUser(id);
    } catch {
      setRows(prev);
      alert("Failed to block user");
    } finally {
      setConfirm(null);
    }
  }

  async function runUnblock(id) {
    const prev = rows.slice();
    setRows(rows.map(r => (r.id === id ? { ...r, status: "active" } : r)));
    try {
      await svc.unblockUser(id);
    } catch {
      setRows(prev);
      alert("Failed to unblock user");
    } finally {
      setConfirm(null);
    }
  }

  const stats = useMemo(() => {
    const total = rows.length;
    const blocked = rows.filter(r => r.status === "blocked").length;
    return { total, blocked, active: total - blocked };
  }, [rows]);

  return (
    <div className="col gap">
      <div className="row gap center-between">
        <h2>Manage Users</h2>
        <div className="muted">Total: {stats.total} · Active: {stats.active} · Blocked: {stats.blocked}</div>
      </div>

      <div className="row gap">
        <input
          className="search"
          placeholder="Search email / role / status"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="skeleton">Loading users…</div>
      ) : (
        <UserTable
          rows={rows}
          onChangeRole={changeRole}
          onBlock={(id) => setConfirm({ id, action: "block" })}
          onUnblock={(id) => setConfirm({ id, action: "unblock" })}
        />
      )}

      <ConfirmDialog
        open={!!confirm}
        title={confirm?.action === "block" ? "Block user?" : "Unblock user?"}
        message={
          confirm?.action === "block"
            ? "The user will not be able to log in or access any routes."
            : "The user will be able to log in again."
        }
        confirmText={confirm?.action === "block" ? "Block" : "Unblock"}
        onCancel={() => setConfirm(null)}
        onConfirm={() => (confirm?.action === "block" ? runBlock(confirm.id) : runUnblock(confirm.id))}
      />
    </div>
  );
}
