alert("AUTH LOADED");

import { auth, db } from "./firebase.js";

import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import {
doc,
setDoc
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

window.register = async function(){

alert("Đã bấm đăng ký");

try{

const email =
document.getElementById("email").value.trim();

const password =
document.getElementById("password").value.trim();

if(!email || !password){

alert("Nhập email và mật khẩu");

return;

}

const userCredential =
await createUserWithEmailAndPassword(
auth,
email,
password
);

const user =
userCredential.user;

await setDoc(
doc(db,"users",user.uid),
{
uid:user.uid,
email:user.email,
nickname:user.email.split("@")[0],
avatar:"🌱",
bio:"",
online:true,
createdAt:new Date().toISOString()
}
);

alert("Đăng ký thành công");

}catch(error){

alert(
"Lỗi:\n\n" +
error.code +
"\n\n" +
error.message
);

console.log(error);

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

alert("Đăng nhập thành công");

}catch(error){

alert(
"Lỗi đăng nhập:\n\n" +
error.message
);

}

};

window.logoutUser = async function(){

try{

await signOut(auth);

alert("Đăng xuất thành công");

}catch(error){

alert(error.message);

}

};

onAuthStateChanged(auth,(user)=>{

const status =
document.getElementById("authStatus");

if(!status) return;

if(user){

status.innerHTML =
"✅ Đang đăng nhập: " +
user.email;

}else{

status.innerHTML =
"❌ Chưa đăng nhập";

}

});
