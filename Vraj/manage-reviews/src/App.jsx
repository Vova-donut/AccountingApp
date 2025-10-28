import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ManagerTransactions from "./pages/ManagerTransactions";
import CustomerDashboard from "./pages/CustomerDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: 12, display: "flex", gap: 12, borderBottom: "1px solid #eee" }}>
        <Link to="/manager">Manager</Link>
        <Link to="/customer">Customer</Link>
      </nav>
      <Routes>
        <Route path="/manager" element={<ManagerTransactions />} />
        <Route path="/customer" element={<CustomerDashboard />} />
        <Route path="*" element={<div style={{padding:24}}>Pick a role above.</div>} />
      </Routes>
    </BrowserRouter>
  );
}
