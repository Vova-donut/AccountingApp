// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1XJep9AzAp5oyh5i-VDdoZdi0HbSarf8",
  authDomain: "accountingapp-29769.firebaseapp.com",
  projectId: "accountingapp-29769",
  // 🔹 corrected this line:
  storageBucket: "accountingapp-29769.appspot.com",
  messagingSenderId: "854292395215",
  appId: "1:854292395215:web:7638cfbbd445277e2fb3ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);
