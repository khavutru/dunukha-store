onAuthStateChanged(auth, (user) => {

const status =
document.getElementById("authStatus");

if (!status) return;

if (user) {

status.innerHTML =
"✅ Đang đăng nhập: " +
user.email;

} else {

status.innerHTML =
"❌ Chưa đăng nhập";

}

});
