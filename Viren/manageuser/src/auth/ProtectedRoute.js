import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ children, requireRole }) {
  const { user } = useAuth();
  const loc = useLocation();

  // not logged in
  if (!user) {
    return <Navigate to={`/login?next=${encodeURIComponent(loc.pathname)}`} replace />;
  }

  // blocked -> bounce to login with an error message
  if (user.status === "blocked") {
    return <Navigate to={`/login?error=blocked`} replace />;
  }

  // role check (only Admin can access this page)
  if (requireRole && user.role !== requireRole) {
    return <Navigate to="/login?error=forbidden" replace />;
  }

  return children;
}
