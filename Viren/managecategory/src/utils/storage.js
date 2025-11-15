import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

const collectionName = "categories";
const colRef = collection(db, collectionName);

const extractString = (value) => {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (value instanceof Date) return value.toISOString();
  return String(value);
};

const normalizeTimestamp = (value) => {
  if (!value) return Date.now();
  if (value?.toMillis) return value.toMillis();
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = Date.parse(value);
    return Number.isNaN(parsed) ? Date.now() : parsed;
  }
  if (value instanceof Date) return value.getTime();
  return Date.now();
};

const normalize = (docSnap) => {
  const data = docSnap.data();
  const rawName =
    data.name ??
    data.categoryName ??
    data.CategoryName ??
    data.category_name ??
    data.title ??
    data.label ??
    data.displayName ??
    "";
  const normalizedName = extractString(rawName).trim();

  const rawType =
    data.type ??
    data.categoryType ??
    data.CategoryType ??
    data.category_type ??
    data.typeName ??
    data.transactionType ??
    data.category ??
    "";
  const typeString = extractString(rawType).toLowerCase();

  let normalizedType = "expense";
  if (typeString.includes("income")) {
    normalizedType = "income";
  } else if (typeString.includes("expense")) {
    normalizedType = "expense";
  } else if (typeof data.isIncome === "boolean") {
    normalizedType = data.isIncome ? "income" : "expense";
  }

  const statusValue = extractString(
    data.status ?? data.state ?? data.visibility ?? ""
  ).toLowerCase();
  const isActive =
    typeof data.active === "boolean"
      ? data.active
      : statusValue
      ? statusValue === "active" ||
        statusValue === "enabled" ||
        statusValue === "visible"
      : true;

  const rawCreatedAt =
    data.createdAt ??
    data.created_on ??
    data.createdOn ??
    data.created ??
    data.addedAt ??
    data.timestamp ??
    null;

  return {
    id: docSnap.id,
    name: normalizedName,
    type: normalizedType,
    active: isActive,
    createdAt: normalizeTimestamp(rawCreatedAt),
  };
};

function sanitizeUpdates(updates = {}) {
  const payload = { ...updates };
  if ("type" in payload) {
    payload.type = payload.type === "income" ? "income" : "expense";
  }
  if ("active" in payload) {
    payload.active = !!payload.active;
  }
  if ("name" in payload) {
    const safeName = extractString(payload.name).trim();
    payload.name = safeName;
  }
  delete payload.id;
  delete payload.createdAt;
  return payload;
}

export const repo = {
  subscribe(onNext) {
    return onSnapshot(colRef, (snapshot) => {
      const docs = snapshot.docs
        .map(normalize)
        .sort((a, b) => b.createdAt - a.createdAt);
      onNext(docs);
    });
  },

  async create({ name, type, active = true }) {
    const safeName = extractString(name).trim();
    const normalizedType = type === "income" ? "income" : "expense";
    const timestamp = serverTimestamp();
    await addDoc(colRef, {
      name: safeName,
      type: normalizedType,
      active,
      createdAt: timestamp,
    });
  },

  async update(id, updates) {
    await updateDoc(doc(colRef, id), sanitizeUpdates(updates));
  },

  async softDelete(id) {
    await updateDoc(doc(colRef, id), { active: false });
  },

  async getActive() {
    const snapshot = await getDocs(query(colRef, where("active", "==", true)));
    return snapshot.docs.map(normalize);
  },
};
