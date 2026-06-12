function createPost(content) {

let posts =
JSON.parse(
localStorage.getItem("dunukha_posts") || "[]"
);

posts.unshift({
id: Date.now(),
content,
createdAt: new Date()
});

localStorage.setItem(
"dunukha_posts",
JSON.stringify(posts)
);
}
