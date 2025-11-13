import React from "react";

export default function UserTable({ rows, onChangeRole, onBlock, onUnblock }) {
  return (
    <div className="card">
      <div className="table_wrap">
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Created</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="muted" style={{ textAlign: "center" }}>
                  No users found.
                </td>
              </tr>
            ) : (
              rows.map(u => (
                <tr key={u.id}>
                  <td>{u.email}</td>
                  <td>
                    <select
                      aria-label={`Change role for ${u.email}`}
                      value={u.role}
                      onChange={e => onChangeRole(u.id, e.target.value)}
                    >
                      <option value="admin">admin</option>
                      <option value="manager">manager</option>
                      <option value="customer">customer</option>
                    </select>
                  </td>
                  <td>
                    <span className={`status ${u.status}`}>{u.status}</span>
                  </td>
                  <td>{new Date(u.createdAt).toLocaleString("en-NZ", { dateStyle: "medium", timeStyle: "short" })}</td>
                  <td style={{ textAlign: "right" }}>
                    {u.status === "active" ? (
                      <button className="btn danger" onClick={() => onBlock(u.id)}>Block</button>
                    ) : (
                      <button className="btn" onClick={() => onUnblock(u.id)}>Unblock</button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
