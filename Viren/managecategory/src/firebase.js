import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD1XJep9AzAp5oyh5i-VDdoZdi0HbSarf8",
  authDomain: "accountingapp-29769.firebaseapp.com",
  projectId: "accountingapp-29769",
  storageBucket: "accountingapp-29769.firebasestorage.app",
  messagingSenderId: "854292395215",
  appId: "1:854292395215:web:7638cfbbd445277e2fb3ba",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
