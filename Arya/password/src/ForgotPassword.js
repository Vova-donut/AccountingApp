import React, { useState } from "react";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    // 1) required
    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    // 2) email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setError("Invalid email format.");
      return;
    }

    // 3) success
    setMsg("✅ Password reset email sent successfully!");
    setEmail("");
  };

  return (
    <div className="reset-page">
      <div className="reset-card">
        <h2 className="reset-title">Forgot Password</h2>
        <p className="reset-sub">
          Enter your registered email address and we’ll send you a link to reset your password.
        </p>

        {msg && <div className="banner ok">{msg}</div>}
        {error && <div className="banner err">{error}</div>}

        <form onSubmit={handleSubmit} className="reset-form">
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`input ${error ? "input-error" : ""}`}
          />
          <button type="submit" className="btn-primary">Send Reset Link</button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => window.location.href = "http://localhost:3000"}
          >
            Back to Login
          </button>

        </form>
      </div>
    </div>
  );
}
