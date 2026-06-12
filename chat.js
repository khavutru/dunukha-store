import { auth, db } from "./firebase.js";

import {
collection,
addDoc,
getDocs,
query,
orderBy,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

let selectedUser = null;

window.loadUsers = async function(){

const usersDiv =
document.getElementById("usersList");

const snapshot =
await getDocs(
collection(db,"users")
);

let html = "";

snapshot.forEach(item=>{

const user =
item.data();

html += `

<div
class="user"
onclick="selectUser('${user.uid}','${user.nickname}')"
>${user.avatar || "🌱"}

${user.nickname || "Người dùng"}

</div>`;

});

usersDiv.innerHTML =
html;

};

window.selectUser =
function(uid,nickname){

selectedUser = uid;

document.getElementById(
"chatMessages"
).innerHTML =
"Đang chat với " + nickname;

};

window.sendMessage =
async function(){

const currentUser =
auth.currentUser;

if(!currentUser){
alert("Hãy đăng nhập");
return;
}

if(!selectedUser){
alert("Chọn người để chat");
return;
}

const content =
document.getElementById(
"messageInput"
).value;

if(!content){
return;
}

await addDoc(
collection(db,"messages"),
{
from:
currentUser.uid,

to:
selectedUser,

content:
content,

createdAt:
serverTimestamp()
}
);

document.getElementById(
"messageInput"
).value = "";

alert("Đã gửi");

};

window.addEventListener(
"load",
loadUsers
);
