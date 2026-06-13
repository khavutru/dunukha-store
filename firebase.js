// firebase.js - Dành cho trình duyệt (CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔁 Cấu hình thật của bạn (đã có)
const firebaseConfig = {
  apiKey: "AIzaSyBJ3DAWyschGA6fM5VmBndLI0cGSaFF46U",
  authDomain: "dunukhasite.firebaseapp.com",
  projectId: "dunukhasite",
  storageBucket: "dunukhasite.firebasestorage.app",
  messagingSenderId: "841226738327",
  appId: "1:841226738327:web:5e0192799adbe1179067d2"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Xuất để app.js dùng
export { auth, db };
