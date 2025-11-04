import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import ManagerTransactions from "./pages/ManagerTransactions";
import CustomerDashboard from "./pages/CustomerDashboard";

function HomeLanding() {
  return (
    <div className="page" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
      <div className="card" style={{ maxWidth: 720, width: "100%", textAlign: "center" }}>
        <img src="/logo192.png" alt="Reviews Logo" style={{ height: 72, width: 72, objectFit: "contain", marginBottom: 12 }} />
        <h1 style={{ color: "var(--color-primary)" }}>Welcome to Reviews</h1>
        <p className="text-sm" style={{ color: "var(--color-primary)", marginBottom: 16 }}>
          Review customer transactions, add manager feedback, and keep everyone aligned.
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <NavLink to="/manager" className="btn btn-primary">Manager View</NavLink>
          <NavLink to="/customer" className="btn">Customer View</NavLink>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <nav className="topnav">
        <div className="topnav-inner">
          <NavLink to="/manager" className={({isActive}) => `nav-link ${isActive?"active":""}`}>Manager</NavLink>
          <NavLink to="/customer" className={({isActive}) => `nav-link ${isActive?"active":""}`}>Customer</NavLink>
        </div>
      </nav>

      <Routes>
        {/* element expects a React ELEMENT, not a component reference */}
        <Route path="/manager" element={<ManagerTransactions />} />
        <Route path="/customer" element={<CustomerDashboard />} />
        <Route path="*" element={<HomeLanding />} />
      </Routes>
    </BrowserRouter>
  );
}
