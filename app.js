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

try{

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
bio:"",
avatar:"🌱",
createdAt:new Date().toISOString()
}
);

alert("Đăng ký thành công");

}catch(error){

alert(error.message);

}

};

window.login = async function(){

try{

const email =
document.getElementById("email").value.trim();

const password =
document.getElementById("password").value.trim();

await signInWithEmailAndPassword(
auth,
email,
password
);

}catch(error){

alert(error.message);

}

};

window.logoutUser = async function(){

await signOut(auth);

};

/* PROFILE */

window.saveProfile = async function(){

const user =
auth.currentUser;

if(!user){

alert("Hãy đăng nhập");

return;

}

await setDoc(
doc(db,"users",user.uid),
{
nickname:
document.getElementById("nickname").value,

bio:
document.getElementById("bio").value
},
{merge:true}
);

alert("Đã lưu hồ sơ");

};

async function loadProfile(){

const user =
auth.currentUser;

if(!user) return;

const snap =
await getDoc(
doc(db,"users",user.uid)
);

if(!snap.exists()) return;

const data =
snap.data();

document.getElementById("nickname").value =
data.nickname || "";

document.getElementById("bio").value =
data.bio || "";

}
