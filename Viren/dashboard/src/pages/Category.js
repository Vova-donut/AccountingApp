import React from "react";
import Sidebar from "../components/Sidebar";
import Button from "../components/Button";
import IframeEmbed from "../components/IframeEmbed";
import "../styles/Dashboard.css";

const Category = ({ active = "category", onNavigate }) => {
  return (
    <div className="dashboard-container">
      <Sidebar active={active} onNavigate={onNavigate} />
      <div className="main-content">
        <div className="topbar">
          <h1>Manage Category</h1>
          <Button variant="secondary" onClick={() => onNavigate && onNavigate("dashboard")}>Back to Dashboard</Button>
        </div>

        <div style={{ marginTop: 30 }}>
          {/* Host external managecategory app inside the dashboard */}
          <IframeEmbed
            title="Manage Category App"
            src={process.env.REACT_APP_MANAGECATEGORY_URL || "http://localhost:3002"}
          />
          <div className="form-actions" style={{ marginTop: 12 }}>
            <Button variant="secondary" onClick={() => window.open(process.env.REACT_APP_MANAGECATEGORY_URL || "http://localhost:3002", "_blank")}>Open in new tab</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
