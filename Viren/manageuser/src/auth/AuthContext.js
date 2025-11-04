import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // hydrate from localStorage once
  useEffect(() => {
    try {
      const raw = localStorage.getItem("authUser");
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  // persist on change
  useEffect(() => {
    try {
      if (user) localStorage.setItem("authUser", JSON.stringify(user));
      else localStorage.removeItem("authUser");
    } catch {}
  }, [user]);

  async function login(email, password) {
    // Demo-only: accept anything non-empty; role by email prefix
    if (!email || !password) throw new Error("Email and password required");
    const role = email.toLowerCase().startsWith("admin") ? "admin" : "user";
    const u = { email, role };
    setUser(u);
    return u;
  }

  function logout() {
    setUser(null);
  }

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
