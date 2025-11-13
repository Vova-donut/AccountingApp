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

    // Validate email
    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setError("Invalid email format.");
      return;
    }

    try {
      // Send password reset email using Firebase default flow
      await sendPasswordResetEmail(auth, email);

      setMsg("✅ Password reset email sent! Check your inbox.");
      setEmail("");
    } catch (err) {
      console.error(err);
      if (err.code === "auth/user-not-found") {
        setError("No user found with that email.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email address.");
      } else {
        setError("Failed to send reset link. Try again later.");
      }
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
            onClick={() => (window.location.href = "/")} // back to login page
          >
            Back to Login
          </button>
        </form>
      </div>
    </div>
  );
}
