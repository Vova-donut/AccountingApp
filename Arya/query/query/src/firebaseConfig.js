import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD1XJep9AzAp5oyh5i-VDdoZdi0HbSarf8",
  authDomain: "accountingapp-29769.firebaseapp.com",
  projectId: "accountingapp-29769",
  storageBucket: "accountingapp-29769.firebasestorage.app",
  messagingSenderId: "854292395215",
  appId: "1:854292395215:web:7638cfbbd445277e2fb3ba"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const now = serverTimestamp;

export default app;
