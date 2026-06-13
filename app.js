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

window.register = async function(){

try{

const email =
document.getElementById("email").value.trim();

const password =
document.getElementById("password").value.trim();

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
bio:""
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

onAuthStateChanged(auth,(user)=>{

const loginPage =
document.getElementById("loginPage");

const appPage =
document.getElementById("appPage");

if(!loginPage || !appPage) return;

if(user){

loginPage.style.display =
"none";

appPage.style.display =
"block";

}else{

loginPage.style.display =
"flex";

appPage.style.display =
"none";

}

});
