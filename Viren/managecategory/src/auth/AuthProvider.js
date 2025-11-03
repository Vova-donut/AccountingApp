import { createContext, useContext, useEffect, useState } from "react";
import { userStore } from "../utils/userStore";

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = userStore.getCurrentUserId();
    if (id) setProfile(userStore.getById(id) || null);
    const unsub = userStore.subscribe(() => {
      const idNow = userStore.getCurrentUserId();
      setProfile(idNow ? userStore.getById(idNow) : null);
    });
    setLoading(false);
    return () => unsub();
  }, []);

  const signOutNow = async () => { await userStore.signOut(); setProfile(null); };

  return (
    <AuthCtx.Provider value={{ profile, loading, signOutNow }}>
      {children}
    </AuthCtx.Provider>
  );
}
