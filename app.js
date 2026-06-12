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

/* =====================
   AUTH
===================== */

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
avatar:"🌱",
bio:"",
followers:0,
following:0,
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

/* =====================
   PROFILE
===================== */

window.saveProfile = async function(){

const user =
auth.currentUser;

if(!user){

alert("Hãy đăng nhập");

return;

}

const nickname =
document.getElementById("nickname").value;

const bio =
document.getElementById("bio").value;

await setDoc(
doc(db,"users",user.uid),
{
nickname:nickname,
bio:bio
},
{merge:true}
);

alert("Lưu hồ sơ thành công");

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

/* =====================
   POSTS
===================== */

window.createPost = async function(){

const user =
auth.currentUser;

if(!user){

alert("Hãy đăng nhập");

return;

}

const caption =
document.getElementById("caption").value;

const image =
document.getElementById("imageUrl").value;

if(!caption){

alert("Nhập nội dung");

return;

}

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
avatar:userData.avatar,
caption:caption,
image:image,
likes:0,
createdAt:serverTimestamp()
}
);

document.getElementById(
"caption"
).value="";

document.getElementById(
"imageUrl"
).value="";

loadFeed();

};

/* =====================
   FEED
===================== */

async function loadFeed(){

const feed =
document.getElementById("feed");

const q =
query(
collection(db,"posts"),
orderBy("createdAt","desc")
);

const snapshot =
await getDocs(q);

let html = "";

snapshot.forEach(item=>{

const post =
item.data();

html += `

<div class="post">

<div class="post-header">

${post.avatar || "🌱"}

${post.nickname || "Người dùng"}

</div>

${
post.image
?
`<img src="${post.image}">`
:
""
}

<div class="post-actions">

❤️

💬

📤

</div>

<div class="post-content">

<b>
${post.nickname}
</b>

<br><br>

${post.caption || ""}

</div>

</div>

`;

});

feed.innerHTML = html;

}

/* =====================
   STATE
===================== */

onAuthStateChanged(
auth,
async(user)=>{

const loginPage =
document.getElementById(
"loginPage"
);

const appPage =
document.getElementById(
"appPage"
);

const status =
document.getElementById(
"authStatus"
);

if(user){

loginPage.style.display =
"none";

appPage.style.display =
"block";

status.innerHTML =
"✅ " + user.email;

await loadProfile();

await loadFeed();

}else{

loginPage.style.display =
"flex";

appPage.style.display =
"none";

status.innerHTML =
"❌ Chưa đăng nhập";

}

}
);
