const profile = {
nickname: "",
bio: "",
badge: "",
avatar: ""
};

function saveProfile(data) {
localStorage.setItem(
"dunukha_profile",
JSON.stringify(data)
);
}
