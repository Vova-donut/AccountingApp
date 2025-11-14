// Very small in-memory mock service for demo purposes
let USERS = [
  { id: "u1", name: "Alice Brown", email: "alice@example.com", role: "user", status: "active" },
  { id: "u2", name: "Bob Smith", email: "bob@example.com", role: "user", status: "blocked" },
  { id: "u3", name: "Admin User", email: "admin@example.com", role: "admin", status: "active" },
];

export async function listUsers() {
  return new Promise(resolve => setTimeout(() => resolve([...USERS]), 200));
}

export async function createUser(data) {
  const id = Math.random().toString(36).slice(2, 9);
  const user = { id, status: "active", role: "user", ...data };
  USERS = [user, ...USERS];
  return new Promise(resolve => setTimeout(() => resolve(user), 150));
}

export async function updateUser(id, patch) {
  USERS = USERS.map(u => (u.id === id ? { ...u, ...patch } : u));
  return new Promise(resolve => setTimeout(() => resolve(USERS.find(u => u.id === id)), 120));
}

export async function deleteUser(id) {
  USERS = USERS.filter(u => u.id !== id);
  return new Promise(resolve => setTimeout(() => resolve({ ok: true }), 100));
}
