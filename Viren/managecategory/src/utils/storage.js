// LocalStorage-backed repo with realtime pub/sub (Firestore-ready)
// Doc shape: { id, name, isDeleted, updatedAt }

const LS_KEY = "categories_v1";
const listeners = new Set();

const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

function read() {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || "[]"); }
  catch { return []; }
}

function write(data) {
  localStorage.setItem(LS_KEY, JSON.stringify(data));
  emit();
}

function emit() {
  const snapshot = list();
  listeners.forEach(cb => cb(snapshot));
}

function seedIfEmpty() {
  const data = read();
  if (data.length === 0) {
    const now = Date.now();
    write([
      { id: uid(), name: "Groceries", isDeleted: false, updatedAt: now },
      { id: uid(), name: "Transport", isDeleted: false, updatedAt: now },
      { id: uid(), name: "Salary",    isDeleted: false, updatedAt: now },
    ]);
  }
}

function list() {
  return [...read()].sort((a, b) => b.updatedAt - a.updatedAt);
}

export const repo = {
  subscribe(onNext) {
    seedIfEmpty();
    onNext(list());
    listeners.add(onNext);
    return () => listeners.delete(onNext);
  },

  async create({ name }) {
    const now = Date.now();
    const data = read();
    const doc = { id: uid(), name, isDeleted: false, updatedAt: now };
    write([doc, ...data]);
    return doc;
  },

  async update(id, updates) {
    const now = Date.now();
    const data = read().map(c => c.id === id ? { ...c, ...updates, updatedAt: now } : c);
    write(data);
    return data.find(c => c.id === id);
  },

  async softDelete(id) {
    const now = Date.now();
    const data = read().map(c => c.id === id ? { ...c, isDeleted: true, updatedAt: now } : c);
    write(data);
    return data.find(c => c.id === id);
  },

  getActive() { return list().filter(c => !c.isDeleted); }
};

// 🔄 Firestore later: replace subscribe/add/update/softDelete with onSnapshot/addDoc/updateDoc.
