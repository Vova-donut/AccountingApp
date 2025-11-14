import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const from = loc.state?.from?.pathname || "/admin/users";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      nav(from, { replace: true });
    } catch (err) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container" style={{ maxWidth: 420 }}>
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Login</h2>
        {error && <div className="alert">{error}</div>}
        <form onSubmit={handleSubmit} className="col gap">
          <label className="col">
            <span>Email</span>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@example.com" />
          </label>
          <label className="col">
            <span>Password</span>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••" />
          </label>
          <button className="btn primary" disabled={loading} type="submit">
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
        <p className="muted" style={{ marginTop: 10 }}>
          Tip: any email+password works. Emails starting with "admin" get admin role.
        </p>
      </div>
    </div>
  );
}
