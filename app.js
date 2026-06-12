/* APP V2 - PHẦN 1 */

import { auth, db } from "./firebase.js";

import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import {
doc,
setDoc,
getDoc,
collection,
addDoc,
getDocs,
query,
orderBy,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

let selectedUser = null;

/* AUTH */

window.register = async function(){

const email =
document.getElementById("email").value.trim();

const password =
document.getElementById("password").value.trim();

if(!email || !password){
alert("Nhập email và mật khẩu");
return;
}

const result =
await createUserWithEmailAndPassword(
auth,
email,
password
);

const user =
result.user;

await setDoc(
doc(db,"users",user.uid),
{
uid:user.uid,
email:user.email,
nickname:user.email.split("@")[0],
avatar:"🌱",
bio:"",
followers:0,
following:0,
createdAt:new Date().toISOString()
}
);

};

window.login = async function(){

const email =
document.getElementById("email").value.trim();

const password =
document.getElementById("password").value.trim();

await signInWithEmailAndPassword(
auth,
email,
password
);

};

window.logoutUser = async function(){

await signOut(auth);

};
