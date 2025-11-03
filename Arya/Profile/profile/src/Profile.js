import React, { useState } from "react";
import "./Profile.css";

export default function Profile() {
  // Simulated logged-in user role (replace later with actual login data)
  const [userRole] = useState("Customer");

  // Different mock data per role
  const profiles = {
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

  const [user, setUser] = useState(profiles[userRole]);
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState("");

  // Validation
  const validate = () => {
    const e = {};
    if (!user.name.trim()) e.name = "Full name is required";
    if (!user.email.trim()) e.email = "Email is required";
    else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/.test(user.email))
      e.email = "Invalid email format";
    if (!user.phone.trim()) e.phone = "Phone is required";
    else if (user.phone.length < 8) e.phone = "Phone number too short";
    if (!user.address.trim()) e.address = "Address is required";
    return e;
  };

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((u) => ({ ...u, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setMsg("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setMsg("✅ Profile updated successfully!");
    }
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
        {/* LEFT SIDEBAR */}
        <aside className="profile-sidebar">
          <div className="avatar">{initials}</div>
          <h2 className="sidebar-name">{user.name}</h2>
          <span className="role-badge">{userRole}</span>
          <p className="sidebar-email">{user.email}</p>

          <div className="sidebar-section">
            <h3>Access summary</h3>
            {userRole === "Customer" && (
              <ul>
                <li>View invoices & payment history</li>
                <li>Update contact details</li>
                <li>Check financial summaries</li>
              </ul>
            )}
            {userRole === "Accountant" && (
              <ul>
                <li>Manage client transactions</li>
                <li>Generate reports & statements</li>
                <li>Access ledger and analytics</li>
              </ul>
            )}
            {userRole === "Admin" && (
              <ul>
                <li>Manage users & permissions</li>
                <li>Control app settings</li>
                <li>View business performance data</li>
              </ul>
            )}
          </div>
        </aside>

        {/* RIGHT MAIN CONTENT */}
        <section className="profile-main">
          <h1 className="profile-title">My Profile</h1>
          <p className="profile-sub">
            Manage and update your personal details below.
          </p>

          {msg && <div className="banner ok">{msg}</div>}

          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="field">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className={errors.name ? "input input-error" : "input"}
                placeholder="Enter full name"
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>

            <div className="field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className={errors.email ? "input input-error" : "input"}
                placeholder="example@gmail.com"
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="field">
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                className={errors.phone ? "input input-error" : "input"}
                placeholder="Enter phone number"
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>

            <div className="field">
              <label>Address</label>
              <textarea
                name="address"
                value={user.address}
                onChange={handleChange}
                className={errors.address ? "input input-error" : "input"}
                rows="3"
                placeholder="Enter address"
              ></textarea>
              {errors.address && <span className="error">{errors.address}</span>}
            </div>

            <div className="actions">
              <button className="btn-primary" type="submit">
                Save Changes
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  setUser(profiles[userRole]);
                  setMsg("");
                  setErrors({});
                }}
              >
                Reset
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
