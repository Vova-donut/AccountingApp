import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ children, requireRole }) {
  const { user } = useAuth();
  const loc = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: loc }} />;
  }
  if (requireRole && user.role !== requireRole) {
    return <Navigate to="/login" replace state={{ from: loc, reason: "forbidden" }} />;
  }
  return children;
}
