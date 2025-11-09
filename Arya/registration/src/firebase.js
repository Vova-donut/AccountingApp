// src/firebase.js
// This file initializes Firebase and exports shared instances
// so we can use them in SignUp (Auth + Firestore).

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";

// Config is read from environment variables (CRA uses REACT_APP_ prefix)
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase app (singleton in this project)
const app = initializeApp(firebaseConfig);

// Export Auth and Firestore instances for reuse
export const auth = getAuth(app);
export const db = getFirestore(app);

// Helper to store server-side timestamps in Firestore
export const now = serverTimestamp;