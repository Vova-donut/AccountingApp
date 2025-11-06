import React, { useState } from "react";
import "./SignUp.css";

const emailOk = (v) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v || "").toLowerCase());

export default function SignUp() {
  const [mode, setMode] = useState("signup");
  const [role, setRole] = useState("Customer");

  const [signup, setSignup] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirm: "",
  });

  const [login, setLogin] = useState({ email: "", password: "" });
  const [sErr, setSErr] = useState({});
  const [lErr, setLErr] = useState({});
  const [sFormMsg, setSFormMsg] = useState("");
  const [lFormMsg, setLFormMsg] = useState("");

  // ---------- validators ----------
  function validateSignup(values) {
    const e = {};
    let anyEmpty = false;

    if (!values.name.trim()) { e.name = "Required"; anyEmpty = true; }
    if (!values.email.trim()) { e.email = "Required"; anyEmpty = true; }
    else if (!emailOk(values.email)) e.email = "Enter a valid email";

    if (!values.phone.trim()) { e.phone = "Required"; anyEmpty = true; }
    else if (!/^[0-9]{7,15}$/.test(values.phone))
      e.phone = "Enter a valid phone number";

    if (!values.address.trim()) { e.address = "Required"; anyEmpty = true; }

    if (!values.password) { e.password = "Required"; anyEmpty = true; }
    else if (values.password.length < 6)
      e.password = "Use at least 6 characters";

    if (!values.confirm) { e.confirm = "Required"; anyEmpty = true; }
    else if (values.confirm !== values.password)
      e.confirm = "Passwords do not match";

    return { e, anyEmpty };
  }

  function validateLogin(values) {
    const e = {};
    let anyEmpty = false;
    if (!values.email.trim()) { e.email = "Required"; anyEmpty = true; }
    else if (!emailOk(values.email)) e.email = "Enter a valid email";
    if (!values.password) { e.password = "Required"; anyEmpty = true; }
    return { e, anyEmpty };
  }

  // ---------- handlers ----------
  function onSignupChange(e) {
    const { name, value } = e.target;
    setSignup((f) => ({ ...f, [name]: value }));
    if (sErr[name]) setSErr((prev) => ({ ...prev, [name]: undefined }));
    setSFormMsg("");
  }

  function onLoginChange(e) {
    const { name, value } = e.target;
    setLogin((f) => ({ ...f, [name]: value }));
    if (lErr[name]) setLErr((prev) => ({ ...prev, [name]: undefined }));
    setLFormMsg("");
  }

  function submitSignup(e) {
    e.preventDefault();
    const { e: errs, anyEmpty } = validateSignup(signup);
    setSErr(errs);
    setSFormMsg(anyEmpty ? "All fields are required." : "");
    if (Object.values(errs).filter(Boolean).length === 0) {
      setSFormMsg("✓ Looks good (demo).");
      setSignup({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        confirm: "",
      });
    }
  }

  function submitLogin(e) {
    e.preventDefault();
    const { e: errs, anyEmpty } = validateLogin(login);
    setLErr(errs);
    setLFormMsg(anyEmpty ? "All fields are required." : "");
    if (Object.values(errs).filter(Boolean).length === 0) {
      setLFormMsg("✓ Ready to log in (demo).");
      setLogin({ email: "", password: "" });
    }
  }

  return (
    <div className="page">
      <div className="card">
        {/* LEFT PANEL */}
        <aside className="left">
          <div className="left-inner">
            <h1 className="brand-title">
              Kia ora, welcome to <br />Accounting App
            </h1>
            <p className="tagline">Manage your business finances effortlessly.</p>
            <p className="desc">
              Track income, expenses, and reports in one secure dashboard.
              Whether you’re an Admin, Accountant, or Customer, gain clear
              insights and make confident decisions every day.
            </p>
            <div className="left-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setMode("login")}
              >
                Log in
              </button>
            </div>
          </div>
        </aside>

        {/* RIGHT PANEL */}
        <section className="right">
          {/* Tabs */}
          <div className="tabs">
            <button
              className={`tab ${mode === "signup" ? "active" : ""}`}
              onClick={() => { setMode("signup"); setLFormMsg(""); setLErr({}); }}
              type="button"
            >
              Create
            </button>
            <button
              className={`tab ${mode === "login" ? "active" : ""}`}
              onClick={() => { setMode("login"); setSFormMsg(""); setSErr({}); }}
              type="button"
            >
              Log in
            </button>
          </div>

          <h2 className="title">
            {mode === "signup" ? "Create your account" : "Welcome back"}
          </h2>

          {/* Role Chips only visible in signup */}
          {mode === "signup" && (
            <div className="role-row" role="tablist" aria-label="Select role">
              {["Customer", "Accountant"].map((r) => (
                <button
                  key={r}
                  type="button"
                  className={`role-chip ${role === r ? "selected" : ""}`}
                  onClick={() => setRole(r)}
                  aria-pressed={role === r}
                >
                  {r}
                </button>
              ))}
            </div>
          )}

          {/* Forms */}
          {mode === "signup" ? (
            <form className="form" onSubmit={submitSignup} noValidate>
              {sFormMsg && (
                <div className={`banner ${sFormMsg.startsWith("✓") ? "ok" : "err"}`}>
                  {sFormMsg}
                </div>
              )}

              <div className={`field ${sErr.name ? "invalid" : ""}`}>
                <input
                  className="input"
                  name="name"
                  type="text"
                  placeholder="Full name"
                  value={signup.name}
                  onChange={onSignupChange}
                  aria-invalid={!!sErr.name}
                />
                {sErr.name && <div className="msg-error">{sErr.name}</div>}
              </div>

              <div className={`field ${sErr.email ? "invalid" : ""}`}>
                <input
                  className="input"
                  name="email"
                  type="email"
                  placeholder="example@gmail.com"
                  value={signup.email}
                  onChange={onSignupChange}
                  aria-invalid={!!sErr.email}
                />
                {sErr.email && <div className="msg-error">{sErr.email}</div>}
              </div>

              <div className={`field ${sErr.phone ? "invalid" : ""}`}>
                <input
                  className="input"
                  name="phone"
                  type="tel"
                  placeholder="Phone number"
                  value={signup.phone}
                  onChange={onSignupChange}
                  aria-invalid={!!sErr.phone}
                />
                {sErr.phone && <div className="msg-error">{sErr.phone}</div>}
              </div>

              <div className={`field ${sErr.address ? "invalid" : ""}`}>
                <input
                  className="input"
                  name="address"
                  type="text"
                  placeholder="Address"
                  value={signup.address}
                  onChange={onSignupChange}
                  aria-invalid={!!sErr.address}
                />
                {sErr.address && <div className="msg-error">{sErr.address}</div>}
              </div>

              <div className={`field ${sErr.password ? "invalid" : ""}`}>
                <input
                  className="input"
                  name="password"
                  type="password"
                  placeholder="************"
                  value={signup.password}
                  onChange={onSignupChange}
                  aria-invalid={!!sErr.password}
                />
                {sErr.password && <div className="msg-error">{sErr.password}</div>}
              </div>

              <div className={`field ${sErr.confirm ? "invalid" : ""}`}>
                <input
                  className="input"
                  name="confirm"
                  type="password"
                  placeholder="************"
                  value={signup.confirm}
                  onChange={onSignupChange}
                  aria-invalid={!!sErr.confirm}
                />
                {sErr.confirm && <div className="msg-error">{sErr.confirm}</div>}
              </div>

              <div className="hint">
                Creating as: <strong>{role}</strong>
              </div>

              <div className="actions">
                <button className="btn-primary" type="submit">
                  Create
                </button>
                <button
                  className="btn-secondary"
                  type="button"
                  onClick={() => setMode("login")}
                >
                  Switch to Log in
                </button>
              </div>
            </form>
          ) : (
            <form className="form" onSubmit={submitLogin} noValidate>
              {lFormMsg && (
                <div className={`banner ${lFormMsg.startsWith("✓") ? "ok" : "err"}`}>
                  {lFormMsg}
                </div>
              )}
              
              <div className={`field ${lErr.email ? "invalid" : ""}`}>
                <input
                  className="input"
                  name="email"
                  type="email"
                  placeholder="example@gmail.com"
                  value={login.email}
                  onChange={onLoginChange}
                  aria-invalid={!!lErr.email}
                />
                {lErr.email && <div className="msg-error">{lErr.email}</div>}
              </div>

              <div className={`field ${lErr.password ? "invalid" : ""}`}>
                <input
                  className="input"
                  name="password"
                  type="password"
                  placeholder="************"
                  value={login.password}
                  onChange={onLoginChange}
                  aria-invalid={!!lErr.password}
                />
                {lErr.password && <div className="msg-error">{lErr.password}</div>}
              </div>

              <div className="actions">
                <button className="btn-primary" type="submit">
                  Log in
                </button>
                <button
                  className="btn-secondary"
                  type="button"
                  onClick={() => setMode("signup")}
                >
                  Switch to Create
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}
