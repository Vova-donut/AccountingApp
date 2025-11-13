// Simple in-memory store to simulate Firestore.
// Replace these functions with Firebase Firestore calls later.

let USERS = [
  {
    id: "u1",
    email: "admin@example.com",
    role: "admin",
    status: "active",
    createdAt: "2025-10-01T03:23:00Z",
    password: "admin123",
  },
  {
    id: "u2",
    email: "manager@company.co",
    role: "manager",
    status: "active",
    createdAt: "2025-10-10T11:05:00Z",
    password: "manager123",
  },
  {
    id: "u3",
    email: "alice@customer.com",
    role: "customer",
    status: "blocked",
    createdAt: "2025-10-12T09:00:00Z",
    password: "alice123",
  },
  {
    id: "u4",
    email: "bob@customer.com",
    role: "customer",
    status: "active",
    createdAt: "2025-10-12T10:00:00Z",
    password: "bob123",
  },
];

export async function login(email, password) {
  const u = USERS.find(x => x.email.toLowerCase() === email.toLowerCase() && x.password === password);
  await delay(300);
  if (!u) {
    const err = new Error("Invalid credentials");
    err.code = "auth/invalid-credentials";
    throw err;
  }
  if (u.status === "blocked") {
    const err = new Error("Your account is blocked. Please contact support.");
    err.code = "auth/user-blocked";
    throw err;
  }
  return { id: u.id, email: u.email, role: u.role, status: u.status, createdAt: u.createdAt };
}

export async function listUsers({ search = "" } = {}) {
  await delay(200);
  const q = search.trim().toLowerCase();
  let rows = [...USERS];
  if (q) {
    rows = rows.filter(
      u =>
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q) ||
        u.status.toLowerCase().includes(q)
    );
  }
  // sort by createdAt desc
  rows.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return rows.map(({ password, ...rest }) => rest);
}

export async function updateUserRole(id, role) {
  await delay(200);
  const i = USERS.findIndex(u => u.id === id);
  if (i >= 0) {
    USERS[i] = { ...USERS[i], role };
    return { id, role };
  }
  throw new Error("User not found");
}

export async function blockUser(id) {
  await delay(200);
  const i = USERS.findIndex(u => u.id === id);
  if (i >= 0) {
    USERS[i] = { ...USERS[i], status: "blocked" };
    return { id, status: "blocked" };
  }
  throw new Error("User not found");
}

export async function unblockUser(id) {
  await delay(200);
  const i = USERS.findIndex(u => u.id === id);
  if (i >= 0) {
    USERS[i] = { ...USERS[i], status: "active" };
    return { id, status: "active" };
  }
  throw new Error("User not found");
}

function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}
