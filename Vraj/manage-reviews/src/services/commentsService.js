const LS_KEY = "transactions_demo";

function loadAll() {
  const raw = localStorage.getItem(LS_KEY);
  return raw ? JSON.parse(raw) : null;
}
function saveAll(data) {
  localStorage.setItem(LS_KEY, JSON.stringify(data));
}

export function bootstrapTransactions(seed) {
  if (!loadAll()) saveAll(seed);
}

export async function listAllTransactions() {
  return loadAll() || [];
}

export async function listTransactionsByCustomer(customerId) {
  const all = loadAll() || [];
  return all.filter(t => t.customerId === customerId);
}

export async function addManagerComment({ transactionId, authorId, text }) {
  const all = loadAll() || [];
  const idx = all.findIndex(t => t.id === transactionId);
  if (idx === -1) throw new Error("Transaction not found");
  const newComment = {
    id: crypto.randomUUID(),
    authorRole: "manager",
    authorId,
    text,
    ts: Date.now()
  };
  const tx = all[idx];
  all[idx] = { ...tx, comments: [newComment, ...(tx.comments || [])] };
  saveAll(all);
  return newComment;
}
export async function addTransaction({ customerId, customerName, date, category, amount }) {
  const all = loadAll() || [];
  const txn = {
    id: crypto.randomUUID(),
    customerId,
    customerName,
    date,        // "YYYY-MM-DD"
    category,
    amount: Number(amount),
    comments: []
  };
  all.push(txn);
  saveAll(all);
  return txn;
}
