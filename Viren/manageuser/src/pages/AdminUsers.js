import React, { useEffect, useMemo, useState } from "react";
import { listUsers, createUser, updateUser } from "../services/userService";
import UserTable from "../components/UserTable";

export default function AdminUsers() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  // no delete flow
  const [notice, setNotice] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await listUsers();
      setUsers(data);
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(u => [u.name, u.email, u.role].join(" ").toLowerCase().includes(q));
  }, [users, query]);

  async function handleCreate(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const email = form.get("email");
    const role = form.get("role") || "user";
    if (!name || !email) return;
    const u = await createUser({ name, email, role });
    setUsers(prev => [u, ...prev]);
    e.currentTarget.reset();
  }

  async function handleToggleStatus(user) {
    if (user.role === "admin") {
      setNotice("Admins cannot be blocked or unblocked.");
      return;
    }
    const patch = { status: user.status === "active" ? "blocked" : "active" };
    const u = await updateUser(user.id, patch);
    setUsers(prev => prev.map(x => (x.id === u.id ? u : x)));
    setNotice("");
  }

  // delete removed

  return (
    <div className="container">
      <div className="row center-between gap" style={{ marginBottom: 12 }}>
        <h2 style={{ margin: 0 }}>Users</h2>
        <input className="search" placeholder="Search users" value={query} onChange={e => setQuery(e.target.value)} />
      </div>

      {notice && (
        <div className="alert">{notice}</div>
      )}

      <div className="card" style={{ marginBottom: 16 }}>
        <form className="row gap" onSubmit={handleCreate}>
          <input name="name" placeholder="Full name" />
          <input name="email" placeholder="Email" type="email" />
          <select name="role" defaultValue="user">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button className="btn primary" type="submit">Add</button>
        </form>
      </div>

      <div className="card">
        {loading ? (
          <div className="skeleton">Loading users…</div>
        ) : (
          <UserTable
            users={filtered}
            onToggleStatus={handleToggleStatus}
          />
        )}
      </div>
    </div>
  );
}
