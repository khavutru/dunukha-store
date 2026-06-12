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
    nickname,
    content
});

localStorage.setItem(
    "dunukha_posts",
    JSON.stringify(posts)
);

renderPosts();

document.getElementById("postContent").value = "";

}

function renderPosts() {
let posts =
JSON.parse(localStorage.getItem("dunukha_posts") || "[]");

let html = "";

posts.forEach(post => {
    html += `
    <div class="post">
        <h3>${post.nickname}</h3>
        <p>${post.content}</p>

        <p>
        ❤️ Ái mộ (0)
        &nbsp;&nbsp;
        🤝 Tôi cũng vậy (0)
        &nbsp;&nbsp;
        💡 Hữu ích (0)
        </p>
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
