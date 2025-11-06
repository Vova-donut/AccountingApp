import React, { useState, useEffect } from "react";
import "./ResetPassword.css";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState(false);
  const [oobCode, setOobCode] = useState("");

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const code = query.get("oobCode");
    setOobCode(code || "");

    if (!code) {
      setError("Invalid or missing reset code.");
      return;
    }

    // read from localStorage
    const data = localStorage.getItem("pwreset_" + code);
    if (!data) {
      setError("Reset link not found or expired.");
      return;
    }

    try {
      const parsed = JSON.parse(data);
      if (Date.now() > parsed.expires) {
        localStorage.removeItem("pwreset_" + code);
        setError("Reset link expired.");
        return;
      }
      setEmail(parsed.email);
      setValid(true);
    } catch {
      setError("Invalid reset data.");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    if (!valid) {
      setError("Reset link invalid or expired.");
      return;
    }

    if (!password || !confirm) {
      setError("All fields are required.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    // save new password to localStorage (for demo only)
    localStorage.setItem(
      "user_" + email.toLowerCase(),
      JSON.stringify({ email, password })
    );
    localStorage.removeItem("pwreset_" + oobCode);

    setMsg("🎉 Password reset successful! Redirecting to login...");
    setTimeout(() => (window.location.href = "http://localhost:3000"), 2500);
  };

  return (
    <div className="resetpass-page">
      <div className="resetpass-card">
        <h2 className="resetpass-title">Reset Password</h2>
        <p className="resetpass-sub">
          {valid
            ? `Resetting password for: ${email}`
            : "Invalid or expired reset link."}
        </p>

        {msg && <div className="banner ok">{msg}</div>}
        {error && <div className="banner err">{error}</div>}

        <form onSubmit={handleSubmit} className="resetpass-form">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`input ${error ? "input-error" : ""}`}
            disabled={!valid}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className={`input ${error ? "input-error" : ""}`}
            disabled={!valid}
          />
          <button
            type="submit"
            className="btn-primary"
            disabled={!valid}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
