import React, { createContext, useContext, useMemo, useState } from "react";
import * as svc from "../services/userService";

// Roles: "admin" | "manager" | "customer"
// Status: "active" | "blocked"

const AuthCtx = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function login(email, password) {
    const u = await svc.login(email, password);
    setUser(u);
    return u;
  }

  function logout() {
    setUser(null);
  }

  const value = useMemo(() => ({ user, login, logout }), [user]);
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  return useContext(AuthCtx);
}
