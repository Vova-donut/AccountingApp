import React, { useState, useEffect } from "react";
import "./ResetPassword.css";
import { auth } from "./firebaseConfig";
import { confirmPasswordReset } from "firebase/auth";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [oobCode, setOobCode] = useState("");

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const code = query.get("oobCode");
    setOobCode(code || "");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

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

    try {
      await confirmPasswordReset(auth, oobCode, password);
      setMsg("🎉 Password reset successful! Redirecting to login...");
      setTimeout(() => (window.location.href = "http://localhost:3000"), 3000);
    } catch (err) {
      console.error(err);
      setError("Invalid or expired reset link.");
    }
  };

  return (
    <div className="resetpass-page">
      <div className="resetpass-card">
        <h2 className="resetpass-title">Reset Password</h2>
        <p className="resetpass-sub">
          Enter and confirm your new password below.
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
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className={`input ${error ? "input-error" : ""}`}
          />
          <button type="submit" className="btn-primary">Reset Password</button>
        </form>
      </div>
    </div>
  );
}
