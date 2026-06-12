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

const post = document.createElement("div");

post.className = "post";

post.innerHTML = `
    <h3>${nickname}</h3>
    <p>${content}</p>
    <p>❤️ 0 | 🤝 0 | 💡 0 | 🌱 0</p>
`;

document
    .getElementById("posts")
    .prepend(post);

document
    .getElementById("postContent")
    .value = "";

}

window.onload = function () {
const nickname =
localStorage.getItem("dunukha_nickname");

if (nickname) {
    document.getElementById("welcome").innerText =
        "Xin chào " + nickname + "!";
}

};
