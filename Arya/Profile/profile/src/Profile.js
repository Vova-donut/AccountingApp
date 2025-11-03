// src/Profile.js
import React, { useState } from "react";
import "./Profile.css";

const emailOk = (v) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v || "").toLowerCase());

// Mock data for 3 different users
const initialProfiles = {
  Customer: {
    name: "Riya Patel",
    email: "riya.customer@example.com",
    phone: "0212345678",
    address: "12 Queen Street, Auckland, NZ"
  },
  Accountant: {
    name: "Harpreet Singh",
    email: "harpreet.accountant@example.com",
    phone: "0229876543",
    address: "45 Balance Road, Wellington, NZ"
  },
  Admin: {
    name: "Sofia Lee",
    email: "sofia.admin@example.com",
    phone: "0205556677",
    address: "89 Ledger Ave, Christchurch, NZ"
  }
};

export default function Profile() {
  const [activeRole, setActiveRole] = useState("Customer");
  const [profiles, setProfiles] = useState(initialProfiles);
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState("");

  const user = profiles[activeRole];

  const validate = (u) => {
    const e = {};
    let anyEmpty = false;

    if (!u.name.trim()) { e.name = "Required"; anyEmpty = true; }
    if (!u.email.trim()) { e.email = "Required"; anyEmpty = true; }
    else if (!emailOk(u.email)) e.email = "Invalid email format";
    if (!u.phone.trim()) { e.phone = "Required"; anyEmpty = true; }
    else if (u.phone.length < 8) e.phone = "Phone number too short";
    if (!u.address.trim()) { e.address = "Required"; anyEmpty = true; }

    if (anyEmpty && Object.keys(e).length === 0) {
      // safety, but practically won't happen
      e._form = "All fields are required.";
    }
    if (anyEmpty) e._form = "All fields are required.";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfiles((prev) => ({
      ...prev,
      [activeRole]: {
        ...prev[activeRole],
        [name]: value
      }
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setMsg("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const current = profiles[activeRole];
    const errs = validate(current);
    setErrors(errs);
    if (Object.keys(errs).filter((k) => k !== "_form").length === 0) {
      setMsg(`✅ ${activeRole} profile updated successfully!`);
      console.log("Updated profiles:", profiles);
    }
  };

  const handleRoleChange = (role) => {
    setActiveRole(role);
    setErrors({});
    setMsg("");
  };

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="profile-page">
      <div className="profile-layout">
        {/* LEFT SUMMARY PANEL */}
        <aside className="profile-sidebar">
          <div className="avatar">{initials}</div>
          <h2 className="sidebar-name">{user.name}</h2>
          <span className="role-badge">{activeRole}</span>
          <p className="sidebar-email">{user.email}</p>

          <div className="role-switch">
            <p className="role-switch-label">View profile as</p>
            <div className="role-pill-row">
              {["Customer", "Accountant", "Admin"].map((r) => (
                <button
                  key={r}
                  type="button"
                  className={
                    "role-pill" + (activeRole === r ? " role-pill-active" : "")
                  }
                  onClick={() => handleRoleChange(r)}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="sidebar-section">
            <h3>Access summary</h3>
            {activeRole === "Customer" && (
              <ul>
                <li>View personal invoices & statements</li>
                <li>Update contact information</li>
                <li>View basic account dashboard</li>
              </ul>
            )}
            {activeRole === "Accountant" && (
              <ul>
                <li>Manage customer transactions</li>
                <li>Prepare financial reports</li>
                <li>Access extended ledger views</li>
              </ul>
            )}
            {activeRole === "Admin" && (
              <ul>
                <li>Manage all user accounts & roles</li>
                <li>Configure organisation settings</li>
                <li>View system-wide reports</li>
              </ul>
            )}
          </div>
        </aside>

        {/* RIGHT EDITABLE FORM PANEL */}
        <section className="profile-main">
          <h1 className="profile-title">Profile details</h1>
          <p className="profile-sub">
            Keep your personal information up to date. Changes are only saved for the
            selected role.
          </p>

          {msg && <div className="banner ok">{msg}</div>}
          {errors._form && !msg && <div className="banner err">{errors._form}</div>}

          <form className="profile-form" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={user.name}
                onChange={handleChange}
                className={`input ${errors.name ? "input-error" : ""}`}
                placeholder="Enter your full name"
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>

            <div className="field">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={user.email}
                onChange={handleChange}
                className={`input ${errors.email ? "input-error" : ""}`}
                placeholder="example@gmail.com"
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="field">
              <label htmlFor="phone">Phone number</label>
              <input
                id="phone"
                name="phone"
                type="text"
                value={user.phone}
                onChange={handleChange}
                className={`input ${errors.phone ? "input-error" : ""}`}
                placeholder="Enter your phone number"
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>

            <div className="field">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                rows="3"
                value={user.address}
                onChange={handleChange}
                className={`input textarea ${errors.address ? "input-error" : ""}`}
                placeholder="Enter your current address"
              />
              {errors.address && <span className="error">{errors.address}</span>}
            </div>

            <div className="actions">
              <button type="submit" className="btn-primary">
                Save changes
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  setProfiles(initialProfiles);
                  setErrors({});
                  setMsg("");
                }}
              >
                Reset all
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
