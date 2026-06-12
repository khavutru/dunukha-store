import { db, auth } from "./firebase.js";

import {
collection,
addDoc,
getDocs,
query,
orderBy,
serverTimestamp,
doc,
getDoc,
updateDoc
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

window.createPost = async function () {

const content =
document.getElementById("postContent").value;

if (!content) {
alert("Nhập nội dung bài viết");
return;
}

const user =
auth.currentUser;

if (!user || !user.uid) {
alert("Bạn phải đăng nhập");
return;
}

try {

const userSnap =
await getDoc(
doc(db,"users",user.uid)
);

const profile =
userSnap.data();

await addDoc(
collection(db,"posts"),
{
userId:user.uid,

email:user.email,

nickname:
profile?.nickname ||
user.email.split("@")[0],

avatar:
profile?.avatar || "🌱",

content:content,

likes:0,

createdAt:
serverTimestamp()
}
);

document.getElementById(
"postContent"
).value = "";

alert("Đăng bài thành công");

loadPosts();

} catch(error){

alert(error.message);

console.log(error);

}

};

window.likePost =
async function(id){

try{

const postRef =
doc(db,"posts",id);

const postSnap =
await getDoc(postRef);

if(postSnap.exists()){

const data =
postSnap.data();

await updateDoc(
postRef,
{
likes:
(data.likes || 0)+1
}
);

loadPosts();

}

}catch(error){

console.log(error);

}

};

window.loadPosts =
async function(){

const postsDiv =
document.getElementById("posts");

if(!postsDiv) return;

const q =
query(
collection(db,"posts"),
orderBy(
"createdAt",
"desc"
)
);

const snapshot =
await getDocs(q);

let html = "";

snapshot.forEach(item=>{

const post =
item.data();

html += `

<div class="post"><h3>
${post.avatar || "🌱"}
${post.nickname || "Người dùng"}
</h3><p>
${post.content || ""}
</p><hr><button
onclick="likePost('${item.id}')"
style="
background:#ef4444;
color:white;
border:none;
padding:10px 15px;
border-radius:10px;
font-weight:bold;
cursor:pointer;
width:auto;
"

«»

❤️ ${post.likes || 0}
</button>

</div>`;

});

postsDiv.innerHTML =
html;

};

window.addEventListener(
"load",
loadPosts
);
