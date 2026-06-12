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

const post = item.data();

html += `

<div class="post"><h3>
${post.avatar || "🌱"}
${post.nickname || "Người dùng"}
</h3><p>
${post.content || ""}
</p><hr><button onclick="likePost('${item.id}')">
❤️ ${post.likes || 0}
</button></div>`;

});

postsDiv.innerHTML = html;

};
