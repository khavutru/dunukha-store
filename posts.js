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
alert("Nhập nội dung");
return;
}

const user = auth.currentUser;

if (!user) {
alert("Hãy đăng nhập");
return;
}

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
profile?.nickname || "Người dùng",

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

};

window.likePost = async function(id){

const posts =
await getDocs(
collection(db,"posts")
);

posts.forEach(async(item)=>{

if(item.id===id){

const data =
item.data();

await updateDoc(
doc(db,"posts",id),
{
likes:(data.likes || 0)+1
}
);

loadPosts();

}

});

};

window.loadPosts = async function () {

const postsDiv =
document.getElementById("posts");

const q =
query(
collection(db,"posts"),
orderBy("createdAt","desc")
);

const snapshot =
await getDocs(q);

let html = "";

snapshot.forEach(item => {

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

«»

❤️ ${post.likes || 0}
</button>

</div>`;

});

postsDiv.innerHTML = html;

};

window.addEventListener(
"load",
loadPosts
);
