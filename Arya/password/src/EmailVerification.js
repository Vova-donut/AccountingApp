import React, { useState } from "react";
import "./EmailVerification.css";

export default function EmailVerification() {
  const [verified, setVerified] = useState(false);
  const [msg, setMsg] = useState("");

  const resendEmail = () => {
    setMsg("✉️ Verification email sent again! Please check your inbox.");
    setTimeout(() => setMsg(""), 4000);
  };

  return (
    <div className="verify-page">
      <div className="verify-card">
        <h2 className="verify-title">Email Verification</h2>
        <p className="verify-sub">
          Your account security is important. Please verify your email address
          to access all features.
        </p>

        {msg && <div className="banner ok">{msg}</div>}

        {!verified ? (
          <div className="verify-box not-verified">
            <div className="icon">⚠️</div>
            <h3>Account Not Verified</h3>
            <p>
              A verification email was sent to your registered address.
              <br />
              Please check your inbox or click below to resend.
            </p>
            <button className="btn-primary" onClick={resendEmail}>
              Resend Verification
            </button>
          </div>
        ) : (
          <div className="verify-box verified">
            <div className="icon">✅</div>
            <h3>Email Verified</h3>
            <p>Your account is now fully active and secure.</p>
            <button className="btn-secondary">Go to Dashboard</button>
          </div>
        )}
      </div>
    </div>
  );
}
