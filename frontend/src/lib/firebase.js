// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// Optional: import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCUVNLuWPQDSsmfVENzfngz3N1sXbEfVHQ",
  authDomain: "ecommerce-266e0.firebaseapp.com",
  projectId: "ecommerce-266e0",
  storageBucket: "ecommerce-266e0.appspot.com", // fixed: remove `.app` typo
  messagingSenderId: "1077261618952",
  appId: "1:1077261618952:web:aa237206e51a7c379066bd",
  measurementId: "G-9KRM6S1BYB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Auth
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Optional: Analytics
// const analytics = getAnalytics(app);

export { auth, googleProvider };
