// lib/firebaseConfig.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// تكوين Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCwQVAX6rd6XfJTgVy-eTFhKBu3Cl4kA2I",
  authDomain: "verse-32e77.firebaseapp.com",
  projectId: "verse-32e77",
  storageBucket: "verse-32e77.firebasestorage.app",
  messagingSenderId: "396500781120",
  appId: "1:396500781120:web:bf152a29d6e7ee760d37a5",
  measurementId: "G-S28HN5RQNS",
};

// التأكد من تهيئة التطبيق مرة واحدة فقط
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app); // التأكد من أن `getAnalytics` يعمل فقط في المتصفح
}

export { db, auth, analytics };
