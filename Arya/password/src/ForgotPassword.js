import React, { useState } from "react";
import "./ForgotPassword.css";
import { auth } from "./firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setError("Invalid email format.");
      return;
    }

    try {
      // send password reset link via Firebase
      await sendPasswordResetEmail(auth, email, {
        url: "http://localhost:3000/reset", // redirect link
        handleCodeInApp: true,
      });
      setMsg("✅ Password reset email sent successfully!");
      setEmail("");
    } catch (err) {
      console.error(err);
      if (err.code === "auth/user-not-found")
        setError("No user found with that email.");
      else setError("Failed to send reset link. Try again.");
    }
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
            onClick={() => (window.location.href = "http://localhost:3000")}
          >
            Back to Login
          </button>
        </form>
      </div>
    </div>
  );
}
