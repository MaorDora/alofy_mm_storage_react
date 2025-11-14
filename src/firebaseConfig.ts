// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcNtpek7jSyN9AycVV2wW7wwDd7I8FAYA",
  authDomain: "alofy-mm-storage.firebaseapp.com",
  projectId: "alofy-mm-storage",
  storageBucket: "alofy-mm-storage.firebasestorage.app",
  messagingSenderId: "223294260203",
  appId: "1:223294260203:web:604ee34e34630cafc60fae",
  measurementId: "G-LDKKQVRYC8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ייצוא השירותים כדי שנוכל להשתמש בהם בכל האפליקציה
export const auth = getAuth(app);
export const db = getFirestore(app);