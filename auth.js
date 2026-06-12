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

window.register = async function () {

try {

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

if (!email || !password) {
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
doc(db, "users", user.uid),
{
uid: user.uid,
email: user.email,

nickname: "Người mới",

avatar: "🌱",

bio: "Xin chào DUNUKHA",

verified: false,

followers: 0,

following: 0,

createdAt: new Date().toISOString()
}
);

alert("Đăng ký thành công");

} catch(error) {

alert(error.message);

console.log(error);

}

};

window.login = async function () {

try {

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

await signInWithEmailAndPassword(
auth,
email,
password
);

alert("Đăng nhập thành công");

} catch(error) {

alert(error.message);

}

};

window.logoutUser = async function () {

try {

await signOut(auth);

alert("Đăng xuất thành công");

} catch(error) {

alert(error.message);

}

};

onAuthStateChanged(auth, (user) => {

const status =
document.getElementById("authStatus");

if (!status) return;

if (user) {

status.innerHTML =
`
✅ Đang đăng nhập:
<br>
${user.email}
`;

if(window.loadProfile){
window.loadProfile();
}

} else {

status.innerHTML =
"❌ Chưa đăng nhập";

}

});
