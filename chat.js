import { auth, db } from "./firebase.js";

import {
collection,
addDoc,
getDocs,
query,
orderBy,
serverTimestamp,
onSnapshot
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

let selectedUser = null;
let selectedName = "";

window.loadUsers = async function(){

const usersDiv =
document.getElementById("usersList");

const snapshot =
await getDocs(
collection(db,"users")
);

let html = "";

snapshot.forEach(item=>{

const user = item.data();

html += `

<div class="user"
onclick="selectUser('${user.uid}','${user.nickname}')">${user.avatar || "🌱"}
${user.nickname || "Người dùng"}

</div>`;

});

usersDiv.innerHTML = html;

};

window.selectUser =
function(uid,nickname){

selectedUser = uid;
selectedName = nickname;

document.getElementById(
"chatMessages"
).innerHTML =
"Đang tải cuộc trò chuyện...";

loadMessages();

};

async function loadMessages(){

if(!selectedUser) return;

const currentUser =
auth.currentUser;

if(!currentUser) return;

const chatBox =
document.getElementById(
"chatMessages"
);

const q =
query(
collection(db,"messages"),
orderBy("createdAt","asc")
);

onSnapshot(q,(snapshot)=>{

let html = "";

snapshot.forEach(doc=>{

const msg =
doc.data();

const isMine =
msg.from === currentUser.uid;

const related =
(
msg.from === currentUser.uid &&
msg.to === selectedUser
)
||
(
msg.from === selectedUser &&
msg.to === currentUser.uid
);

if(!related) return;

html += `

<div class="${
isMine ?
'myMessage'
:
'message'
}">
${msg.content}
</div>
`;});

chatBox.innerHTML = html;

chatBox.scrollTop =
chatBox.scrollHeight;

});

}

window.sendMessage =
async function(){

const currentUser =
auth.currentUser;

if(!currentUser){

alert("Hãy đăng nhập");

return;

}

if(!selectedUser){

alert("Chọn người dùng");

return;

}

const content =
document.getElementById(
"messageInput"
).value.trim();

if(!content) return;

await addDoc(
collection(db,"messages"),
{
from: currentUser.uid,
to: selectedUser,
content: content,
createdAt: serverTimestamp()
}
);

document.getElementById(
"messageInput"
).value = "";

};

window.addEventListener(
"load",
loadUsers
);
