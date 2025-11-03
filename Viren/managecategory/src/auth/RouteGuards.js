import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export function RequireActive({ children }) {
  const { loading, profile } = useAuth();
  if (loading) return null;
  if (!profile) return <Navigate to="/login" replace />;
  if (profile.status === "blocked") return <Navigate to="/blocked" replace />;
  return children;
}

export function RequireAdmin({ children }) {
  const { loading, profile } = useAuth();
  if (loading) return null;
  if (!profile) return <Navigate to="/login" replace />;
  if (profile.status === "blocked") return <Navigate to="/blocked" replace />;
  if (profile.role !== "admin") return <Navigate to="/not-authorized" replace />;
  return children;
}
