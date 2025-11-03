// LocalStorage-based mock database for users (no Firebase)
const LS_USERS = "users_v1";
const LS_AUTH = "auth_user_id";
const listeners = new Set();

const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

function read() {
  try { return JSON.parse(localStorage.getItem(LS_USERS) || "[]"); }
  catch { return []; }
}
function write(data) { localStorage.setItem(LS_USERS, JSON.stringify(data)); emit(); }
function emit() { const snapshot = list(); listeners.forEach(cb => cb(snapshot)); }
function list() { return [...read()].sort((a,b)=>b.createdAt - a.createdAt); }

function seedIfEmpty() {
  const data = read();
  if (data.length) return;
  const now = Date.now();
  write([
    { id: uid(), email: "admin@example.com", role: "admin", status: "active", createdAt: now, password: "admin123" },
    { id: uid(), email: "manager@example.com", role: "manager", status: "active", createdAt: now-100000, password: "manager123" },
    { id: uid(), email: "customer@example.com", role: "customer", status: "active", createdAt: now-200000, password: "customer123" },
  ]);
}

export const userStore = {
  subscribe(onNext) { seedIfEmpty(); onNext(list()); listeners.add(onNext); return ()=>listeners.delete(onNext); },
  list,
  getById(id){ return read().find(u=>u.id===id)||null; },
  getByEmail(email){ return read().find(u=>u.email===email)||null; },

  async update(id,updates){ const d=read().map(u=>u.id===id?{...u,...updates}:u); write(d); return d.find(u=>u.id===id); },

  getCurrentUserId(){ return localStorage.getItem(LS_AUTH); },
  setCurrentUserId(id){ localStorage.setItem(LS_AUTH,id); },
  clearCurrentUserId(){ localStorage.removeItem(LS_AUTH); },

  async signIn(email,password){
    seedIfEmpty();
    const u=this.getByEmail(email);
    if(!u) throw new Error("User not found");
    if(u.password!==password) throw new Error("Invalid credentials");
    if(u.status==="blocked") throw new Error("Your account is blocked. Contact admin.");
    this.setCurrentUserId(u.id);
    return u;
  },
  async signOut(){ this.clearCurrentUserId(); }
};
