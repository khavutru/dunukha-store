alert("APP LOADED");

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
avatar:"🌱",
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

window.saveProfile = async function(){

const user =
auth.currentUser;

if(!user) return;

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

alert("Đã lưu");

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

window.createPost = async function(){

const user =
auth.currentUser;

if(!user) return;

const profile =
await getDoc(
doc(db,"users",user.uid)
);

const userData =
profile.data();

await addDoc(
collection(db,"posts"),
{
userId:user.uid,
nickname:userData.nickname,
avatar:"🌱",
caption:
document.getElementById("caption").value,
likes:0,
createdAt:serverTimestamp()
}
);

document.getElementById("caption").value="";

loadFeed();

};

window.likePost = async function(postId){

const postRef =
doc(db,"posts",postId);

const postSnap =
await getDoc(postRef);

if(!postSnap.exists()) return;

const data =
postSnap.data();

await setDoc(
postRef,
{
...data,
likes:(data.likes || 0)+1
}
);

loadFeed();

};

async function loadFeed(){

const feed =
document.getElementById("feed");

const snapshot =
await getDocs(
query(
collection(db,"posts"),
orderBy("createdAt","desc")
)
);

let html="";

snapshot.forEach(item=>{

const post =
item.data();

html += `

<div class="post"><div class="post-header">🌱 ${post.nickname}

</div><div class="post-content">${post.caption}

</div><div class="post-actions"><button
onclick="likePost('${item.id}')">

❤️ ${post.likes || 0}

</button></div></div>`;

});

feed.innerHTML =
html;

}

onAuthStateChanged(
auth,
async(user)=>{

const loginPage =
document.getElementById("loginPage");

const appPage =
document.getElementById("appPage");

if(user){

loginPage.style.display =
"none";

appPage.style.display =
"block";

await loadProfile();

await loadFeed();

}else{

loginPage.style.display =
"flex";

appPage.style.display =
"none";

}

}
);
