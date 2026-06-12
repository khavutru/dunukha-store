import { auth, db } from "./firebase.js";

import {
doc,
getDoc,
updateDoc
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

window.saveProfile = async function() {

const user = auth.currentUser;

if(!user){
alert("Hãy đăng nhập");
return;
}

await updateDoc(
doc(db,"users",user.uid),
{
nickname:
document.getElementById("nickname").value,

avatar:
document.getElementById("avatar").value,

bio:
document.getElementById("bio").value
}
);

alert("Lưu hồ sơ thành công");

};

window.loadProfile = async function() {

const user = auth.currentUser;

if(!user) return;

const snap =
await getDoc(
doc(db,"users",user.uid)
);

if(!snap.exists()) return;

const data = snap.data();

document.getElementById("nickname").value =
data.nickname || "";

document.getElementById("avatar").value =
data.avatar || "🌱";

document.getElementById("bio").value =
data.bio || "";

};
