import React from "react";

export default function UserTable({ users, onEdit, onToggleStatus }) {
  if (!users?.length) return <div className="skeleton">No users</div>;
  return (
    <div className="table_wrap">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th style={{ width: 120 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td className="muted">{u.email}</td>
              <td>{u.role}</td>
              <td>
                <span className={`status ${u.status}`}>{u.status}</span>
              </td>
              <td>
                <div className="row gap">
                  <button className="btn" onClick={() => onEdit?.(u)}>Edit</button>
                  <button
                    className="btn"
                    disabled={u.role === "admin"}
                    title={u.role === "admin" ? "Admins cannot be blocked" : undefined}
                    onClick={() => onToggleStatus?.(u)}
                  >
                    {u.status === "active" ? "Block" : "Unblock"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
