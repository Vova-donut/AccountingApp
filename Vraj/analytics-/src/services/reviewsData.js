// Read transactions written by ACC-6 (manage-reviews)
// If none exist yet on this origin, seed with the same sample data
const LS_KEY = "transactions_demo";

const seedTransactions = [
  // Alice Smith
  { id: "txn_001",  customerId: "cust_001", customerName: "Alice Smith", date: "2025-10-01", category: "Salary",    amount: 3600.0, comments: [] },
  { id: "txn_001a", customerId: "cust_001", customerName: "Alice Smith", date: "2025-10-20", category: "Groceries", amount: 84.5,  comments: [] },
  { id: "txn_004",  customerId: "cust_001", customerName: "Alice Smith", date: "2025-10-26", category: "Transport", amount: 15.9,  comments: [] },

  // Bob Johnson
  { id: "txn_002s", customerId: "cust_002", customerName: "Bob Johnson",  date: "2025-10-01", category: "Salary",    amount: 3500.0, comments: [] },
  { id: "txn_002",  customerId: "cust_002", customerName: "Bob Johnson",  date: "2025-10-22", category: "Transport", amount: 26.0,  comments: [] },
  { id: "txn_005",  customerId: "cust_002", customerName: "Bob Johnson",  date: "2025-10-25", category: "Bills",     amount: 120.0, comments: [] },

  // Viren
  { id: "txn_003f", customerId: "cust_003", customerName: "Viren",        date: "2025-10-03", category: "Freelance", amount: 700.0, comments: [] },
  { id: "txn_003",  customerId: "cust_003", customerName: "Viren",        date: "2025-10-24", category: "Black myth Wukong: game", amount: 180.0, comments: [] },
];

function saveAll(data) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(data)); } catch {}
}

function loadAll() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return JSON.parse(raw);
    // Seed if empty so analytics works standalone
    saveAll(seedTransactions);
    return seedTransactions;
  } catch {
    return seedTransactions;
  }
}

// Best-effort mapping from category text to a transaction type
function deriveType(category) {
  const c = String(category || "").toLowerCase();
  const incomeHints = [
    "salary",
    "freelance",
    "bonus",
    "interest",
    "investment",
    "dividend",
    "refund",
    "reimbursement",
  ];
  return incomeHints.some((h) => c.includes(h)) ? "income" : "expense";
}

export async function listCustomers() {
  const all = loadAll();
  const map = new Map();
  for (const t of all) {
    if (!map.has(t.customerId)) map.set(t.customerId, { id: t.customerId, name: t.customerName });
  }
  return Array.from(map.values());
}

export async function listTransactionsByCustomer(customerId) {
  const all = loadAll();
  return all
    .filter((t) => t.customerId === customerId)
    .map((t) => ({
      id: t.id,
      date: t.date,
      category: t.category,
      amount: Number(t.amount || 0),
      type: deriveType(t.category),
    }));
}

// Utility to clear and reseed demo data for this origin
export async function resetDemoData() {
  try { localStorage.removeItem(LS_KEY); } catch {}
  // After clearing, the next load will reseed automatically
  return loadAll();
}
