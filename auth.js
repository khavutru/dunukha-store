window.register = async function() {

try {

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

const userCredential =
await createUserWithEmailAndPassword(
auth,
email,
password
);

const user =
userCredential.user;

await setDoc(
doc(db, "users", user.uid),
{
uid: user.uid,
email: user.email,
nickname: email.split("@")[0],
bio: "",
badge: "🌱 Thành viên mới",
verified: false,
createdAt: new Date().toISOString()
}
);

alert("Đăng ký thành công");

} catch(error) {

alert(
"Lỗi: " +
error.code +
"\n\n" +
error.message
);

console.log(error);

}

};
