import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import Login from "./pages/Login";
import AdminUsers from "./pages/AdminUsers";
import "./styles.css";

function TopBar() {
  const { user, logout } = useAuth();
  return (
    <header className="topbar">
      <strong>Manage Users</strong>
      <nav>
        <Link to="/admin/users" style={{ color: "#fff" }}>Users</Link>
      </nav>
      <div style={{ flex: 1 }} />
      {user ? (
        <>
          <span>{user.email}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <Link to="/login" style={{ color: "#fff" }}>Login</Link>
      )}
    </header>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TopBar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Navigate to="/admin/users" />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute requireRole="admin">
                  <AdminUsers />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
}
