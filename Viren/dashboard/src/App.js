import React, { useState } from "react";
import AdminDashboard from "./pages/AdminDashboard";
import Category from "./pages/Category";
import ManageAdmin from "./pages/ManageAdmin";

function App() {
  const [page, setPage] = useState("dashboard");

  if (page === "category") return <Category active={page} onNavigate={setPage} />;
  if (page === "manage-admin") return <ManageAdmin active={page} onNavigate={setPage} />;
  return <AdminDashboard active={page} onNavigate={setPage} />;
}

export default App;
