import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBB9EVZabGlXc7Mg_wPlvQlIUCTSZVgiEM",
  authDomain: "ganado360-5ab7d.firebaseapp.com",
  projectId: "ganado360-5ab7d",
  storageBucket: "ganado360-5ab7d.firebasestorage.app",
  messagingSenderId: "515528662485",
  appId: "1:515528662485:web:3af58eba46c7c68c85715c",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);