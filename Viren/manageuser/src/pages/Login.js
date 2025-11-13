import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const { user, login } = useAuth();
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const nav = useNavigate();
  const loc = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(loc.search);
    const err = params.get("error");
    if (err === "blocked") setError("Your account is blocked. Please contact support.");
    if (err === "forbidden") setError("You don't have access to that page.");
  }, [loc.search]);

  useEffect(() => {
    if (user) nav("/admin/users", { replace: true });
  }, [user, nav]);

  async function submit(e) {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      const next = new URLSearchParams(loc.search).get("next");
      nav(next || "/admin/users", { replace: true });
    } catch (err) {
      setError(err.message || "Login failed");
    }
  }

  return (
    <div className="card" style={{ maxWidth: 420, margin: "40px auto" }}>
      <h2>Admin Login</h2>
      {error && <div className="alert">{error}</div>}
      <form onSubmit={submit} className="col gap">
        <label className="col">
          <span>Email</span>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
        </label>
        <label className="col">
          <span>Password</span>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <button className="btn primary" type="submit">Log in</button>
      </form>
      <p className="muted" style={{ marginTop: 8 }}>
        Try manager@company.co / manager123 or alice@customer.com / alice123 (blocked) for demo.
      </p>
    </div>
  );
}
