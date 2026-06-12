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

window.onload = function () {
const nickname = localStorage.getItem("dunukha_nickname");

if (nickname) {
    document.getElementById("welcome").innerText =
        "Xin chào " + nickname + "!";
}

};
