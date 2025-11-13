import React, { useState } from "react";
import "./App.css";
import CustomerSupportPage from "./CustomerSupportPage";

function App() {
  // Default role is customer
  const [userRole, setUserRole] = useState("customer");

  // Fake UID for demo/testing (real login will replace later)
  const uid = userRole + "_TEST_USER_1";

  return (
    <div className="App">
      {/* Role Switcher */}
      <div style={{
        display: "flex",
        gap: "10px",
        justifyContent: "center",
        padding: "20px",
        background: "#f0f4f8",
        borderBottom: "1px solid #ddd"
      }}>
        <button
          className={`role-btn ${userRole === "customer" ? "active" : ""}`}
          onClick={() => setUserRole("customer")}
        >
          Customer
        </button>

        <button
          className={`role-btn ${userRole === "accountant" ? "active" : ""}`}
          onClick={() => setUserRole("accountant")}
        >
          Accountant
        </button>

        <button
          className={`role-btn ${userRole === "admin" ? "active" : ""}`}
          onClick={() => setUserRole("admin")}
        >
          Admin
        </button>
      </div>

      {/* Support System */}
      <CustomerSupportPage userRole={userRole} uid={uid} />
    </div>
  );
}

export default App;
