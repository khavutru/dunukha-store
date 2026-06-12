import { db, auth } from "./firebase.js";

import {
collection,
addDoc,
getDocs,
query,
orderBy,
serverTimestamp
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

await addDoc(
collection(db, "posts"),
{
userId: user.uid,
email: user.email,
nickname: user.email.split("@")[0],
content: content,
likes: 0,
createdAt: serverTimestamp()
}
);

document.getElementById("postContent").value = "";

alert("Đăng bài thành công");

loadPosts();

};

window.loadPosts = async function () {

const postsDiv =
document.getElementById("posts");

const q =
query(
collection(db, "posts"),
orderBy("createdAt", "desc")
);

const snapshot =
await getDocs(q);

let html = "";

snapshot.forEach(doc => {

const post = doc.data();

html += `
<div class="post">

<h3>🌌 ${post.nickname}</h3>

<p>${post.content}</p>

<hr>

❤️ ${post.likes || 0}

</div>
`;

});

postsDiv.innerHTML = html;

};

window.addEventListener(
"load",
loadPosts
);
