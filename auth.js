function register() {

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

alert(
"Đăng ký sẽ được kết nối Firebase ở bước tiếp theo.\n\nEmail: " +
email
);
}

function login() {

const email =
document.getElementById("email").value;

alert(
"Đăng nhập sẽ được kết nối Firebase ở bước tiếp theo.\n\nEmail: " +
email
);
}

function logoutUser() {

document.getElementById(
"authStatus"
).innerText =
"Đã đăng xuất";

}
