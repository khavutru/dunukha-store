function saveNickname() {
const nickname = document.getElementById("nickname").value;

if (!nickname) {
alert("Vui lòng nhập nickname");
return;
}

localStorage.setItem("dunukha_nickname", nickname);

document.getElementById("welcome").innerText =
"Xin chào " + nickname + "!";
}

function createPost() {
const content =
document.getElementById("postContent").value;

const nickname =
localStorage.getItem("dunukha_nickname") || "Ẩn danh";

if (!content) {
alert("Hãy nhập nội dung bài viết");
return;
}

let posts =
JSON.parse(localStorage.getItem("dunukha_posts") || "[]");

posts.unshift({
id: Date.now(),
nickname,
content,
time: new Date().toLocaleString(),
admire: 0,
relate: 0,
useful: 0
});

localStorage.setItem(
"dunukha_posts",
JSON.stringify(posts)
);

document.getElementById("postContent").value = "";

renderPosts();
}

function react(postId, type) {
let posts =
JSON.parse(localStorage.getItem("dunukha_posts") || "[]");

posts = posts.map(post => {
if (post.id === postId) {
post[type]++;
}
return post;
});

localStorage.setItem(
"dunukha_posts",
JSON.stringify(posts)
);

renderPosts();
}

function deletePost(postId) {
let posts =
JSON.parse(localStorage.getItem("dunukha_posts") || "[]");

posts = posts.filter(
post => post.id !== postId
);

localStorage.setItem(
"dunukha_posts",
JSON.stringify(posts)
);

renderPosts();
}

function renderPosts() {
let posts =
JSON.parse(localStorage.getItem("dunukha_posts") || "[]");

let html = "";

posts.forEach(post => {

html += `
<div class="post">

  <h3>
    🌌 ${post.nickname} ✓
  </h3>

  <small>
    ${post.time}
  </small>

  <br><br>

  <p>
    ${post.content}
  </p>

  <div class="reactions">

    <button onclick="react(${post.id}, 'admire')">
      ❤️ Ái mộ (${post.admire})
    </button>

    <button onclick="react(${post.id}, 'relate')">
      🤝 Tôi cũng vậy (${post.relate})
    </button>

    <button onclick="react(${post.id}, 'useful')">
      💡 Hữu ích (${post.useful})
    </button>

    <button onclick="deletePost(${post.id})">
      🗑️ Xóa
    </button>

  </div>

</div>
`;

});

document.getElementById("posts").innerHTML = html;
}

window.onload = function () {

const nickname =
localStorage.getItem("dunukha_nickname");

if (nickname) {
document.getElementById("welcome").innerText =
"Xin chào " + nickname + "!";
}

renderPosts();
};
