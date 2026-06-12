import { auth, db } from "./firebase.js";

import {
doc,
getDoc,
setDoc
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

window.saveProfile = async function(){

const user =
auth.currentUser;

if(!user){
alert("Hãy đăng nhập");
return;
}

const nickname =
document.getElementById("nickname").value;

const avatar =
document.getElementById("avatar").value;

const bio =
document.getElementById("bio").value;

await setDoc(
doc(db,"users",user.uid),
{
uid:user.uid,
email:user.email,
nickname:nickname,
avatar:avatar,
bio:bio,
online:true
},
{merge:true}
);

alert("Lưu hồ sơ thành công");

};

window.loadProfile = async function(){

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

document.getElementById("avatar").value =
data.avatar || "🌱";

document.getElementById("bio").value =
data.bio || "";

};

setInterval(()=>{

if(auth.currentUser){

loadProfile();

}

},3000);
