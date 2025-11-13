import React from "react";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import Button from "../components/Button";
import "../styles/Dashboard.css";

const AdminDashboard = ({ active = "dashboard", onNavigate }) => {
  return (
    <div className="dashboard-container">
      <Sidebar active={active} onNavigate={onNavigate} />
      <div className="main-content">
        <div className="topbar">
          <h1>Admin Dashboard</h1>
          <Button variant="secondary">Logout</Button>
        </div>

        <div className="cards">
          <Card
            title="Manage Category"
            value={5}
            icon="🗂️"
            onClick={() => onNavigate && onNavigate("category")}
            interactive
          />
          <Card
            title="Manage Admin"
            value={3}
            icon="👤"
            onClick={() => onNavigate && onNavigate("manage-admin")}
            interactive
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
