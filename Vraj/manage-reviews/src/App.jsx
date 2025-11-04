import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import ManagerTransactions from "./pages/ManagerTransactions";
import CustomerDashboard from "./pages/CustomerDashboard";

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
        {/* ✅ element expects a React ELEMENT, not a component reference */}
        <Route path="/manager" element={<ManagerTransactions />} />
        <Route path="/customer" element={<CustomerDashboard />} />
        <Route path="*" element={<div style={{ padding: 24 }}>Pick a role above.</div>} />
      </Routes>
    </BrowserRouter>
  );
}
