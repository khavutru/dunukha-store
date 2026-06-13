
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import {
getAuth
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import {
getFirestore
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const firebaseConfig = {
apiKey: "AIzaSyCDLlBCUXLxSXb3n4ubjv40EM2jpcodA-c",
authDomain: "dunukha-community.firebaseapp.com",
projectId: "dunukha-community",
storageBucket: "dunukha-community.firebasestorage.app",
messagingSenderId: "48190569970",
appId: "1:48190569970:web:7f0292bace5d342cd33f6b"
};

const app =
initializeApp(firebaseConfig);

export const auth =
getAuth(app);

export const db =
getFirestore(app);

console.log("Firebase Ready");
