import React, { useState } from "react";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [mockLink, setMockLink] = useState("");

  // generate fake reset code
  const makeCode = () =>
    Date.now().toString(36) + Math.random().toString(36).slice(2, 9);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMsg("");
    setError("");
    setMockLink("");

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setError("Invalid email format.");
      return;
    }

    // create fake code and save it to localStorage
    const code = makeCode();
    const expires = Date.now() + 1000 * 60 * 60; // 1 hour
    const payload = { email, expires };
    localStorage.setItem("pwreset_" + code, JSON.stringify(payload));

    const fakeLink = `${window.location.origin}/reset?oobCode=${code}`;
    setMsg("✅ Mock reset link generated below (for local testing).");
    setMockLink(fakeLink);
    setEmail("");
  };

  return (
    <div className="reset-page">
      <div className="reset-card">
        <h2 className="reset-title">Forgot Password</h2>
        <p className="reset-sub">
          Enter your registered email address and we’ll send you a link to reset
          your password (mock version for local test).
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
          <button type="submit" className="btn-primary">
            Generate Mock Reset Link
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => (window.location.href = "http://localhost:3000")}
          >
            Back to Login
          </button>
        </form>

        {mockLink && (
          <div style={{ marginTop: 18 }}>
            <p style={{ wordBreak: "break-all", fontSize: 13 }}>
              <strong>Reset link:</strong> {mockLink}
            </p>
            <button
              className="btn-secondary"
              onClick={() => window.open(mockLink, "_blank")}
            >
              Open Reset Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
