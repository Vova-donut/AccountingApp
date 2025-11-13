import React from "react";

const Sidebar = ({ active = "dashboard", onNavigate }) => {
  const handleNav = (e, key) => {
    e.preventDefault();
    if (onNavigate) onNavigate(key);
  };

  return (
    <aside className="sidebar">
      <h2>ADMIN</h2>
      <nav>
        <a
          href="#"
          className={active === "dashboard" ? "active" : ""}
          onClick={(e) => handleNav(e, "dashboard")}
        >
          Dashboard
        </a>
        <a
          href="#"
          className={active === "category" ? "active" : ""}
          onClick={(e) => handleNav(e, "category")}
        >
          Category
        </a>
        <a
          href="#"
          className={active === "manage-admin" ? "active" : ""}
          onClick={(e) => handleNav(e, "manage-admin")}
        >
          Manage Admin
        </a>
      </nav>
    </aside>
  );
};

export default Sidebar;
