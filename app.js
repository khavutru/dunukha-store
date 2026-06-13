// app.js
import { auth, db } from "./firebase.js";
import {
  signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  collection, addDoc, query, orderBy, onSnapshot,
  doc, updateDoc, arrayUnion, arrayRemove, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const provider = new GoogleAuthProvider();
let currentUser = null;

const loginScreen = document.getElementById('login-screen');
const appDiv = document.getElementById('app');
const feedContainer = document.getElementById('feed-container');
const postModal = document.getElementById('post-modal');
const btnGoogleLogin = document.getElementById('google-login');
const btnAddPost = document.getElementById('btn-add-post');
const btnAddPostMobile = document.getElementById('btn-add-post-mobile');
const btnCloseModal = document.getElementById('btn-close-modal');
const btnSubmitPost = document.getElementById('btn-submit-post');
const postImageUrl = document.getElementById('post-image-url');
const postCaption = document.getElementById('post-caption');
const storyYourself = document.getElementById('story-yourself');
const yourAvatar = document.getElementById('your-avatar');
const btnProfile = document.getElementById('btn-profile');

btnGoogleLogin.addEventListener('click', async () => {
  try { await signInWithPopup(auth, provider); } catch (e) { alert("Lỗi đăng nhập: " + e.message); }
});

onAuthStateChanged(auth, user => {
  if (user) {
    currentUser = user;
    loginScreen.style.display = 'none';
    appDiv.style.display = 'flex';
    storyYourself.style.display = 'flex';
    yourAvatar.src = user.photoURL || 'https://via.placeholder.com/66';
    loadPosts();
  } else {
    currentUser = null;
    loginScreen.style.display = 'flex';
    appDiv.style.display = 'none';
  }
});

btnAddPost.addEventListener('click', () => postModal.style.display = 'flex');
btnAddPostMobile.addEventListener('click', () => postModal.style.display = 'flex');
btnCloseModal.addEventListener('click', () => postModal.style.display = 'none');

btnSubmitPost.addEventListener('click', async () => {
  const imageUrl = postImageUrl.value.trim();
  const caption = postCaption.value.trim();
  if (!imageUrl) return alert("Cần link ảnh");
  try {
    await addDoc(collection(db, "posts"), {
      uid: currentUser.uid,
      username: currentUser.displayName || "Người dùng",
      userAvatar: currentUser.photoURL || 'https://via.placeholder.com/32',
      imageUrl,
      caption,
      likes: [],
      comments: [],
      createdAt: serverTimestamp()
    });
    postModal.style.display = 'none';
    postImageUrl.value = '';
    postCaption.value = '';
  } catch (e) { alert("Lỗi: " + e.message); }
});

function loadPosts() {
  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
  onSnapshot(q, snapshot => {
    feedContainer.innerHTML = '';
    snapshot.forEach(docSnap => renderPost({ id: docSnap.id, ...docSnap.data() }));
  });
}

function renderPost(post) {
  const liked = post.likes?.includes(currentUser.uid);
  const div = document.createElement('div');
  div.className = 'post';
  div.innerHTML = `
    <div class="post-header"><img class="avatar" src="${post.userAvatar}" onerror="this.src='https://via.placeholder.com/32'"><span class="username">${post.username}</span></div>
    <img class="post-image" src="${post.imageUrl}" onerror="this.src='https://via.placeholder.com/400'">
    <div class="post-actions">
      <i class="${liked ? 'fas fa-heart liked' : 'far fa-heart'}" data-id="${post.id}" data-action="like"></i>
      <i class="far fa-comment"></i>
      <i class="far fa-paper-plane"></i>
    </div>
    <div class="post-likes">${post.likes?.length || 0} lượt thích</div>
    <div class="post-caption"><span class="username">${post.username}</span>${post.caption}</div>
    <div class="post-comments">Xem tất cả ${post.comments?.length || 0} bình luận</div>
    <div class="post-comment-input">
      <input type="text" placeholder="Thêm bình luận..." id="comment-input-${post.id}">
      <button data-id="${post.id}" class="btn-send-comment">Đăng</button>
    </div>
  `;
  feedContainer.appendChild(div);

  div.querySelector('[data-action="like"]').addEventListener('click', async (e) => {
    const id = e.target.dataset.id;
    const ref = doc(db, "posts", id);
    if (liked) await updateDoc(ref, { likes: arrayRemove(currentUser.uid) });
    else await updateDoc(ref, { likes: arrayUnion(currentUser.uid) });
  });

  div.querySelector('.btn-send-comment').addEventListener('click', async function() {
    const id = this.dataset.id;
    const input = document.getElementById(`comment-input-${id}`);
    const text = input.value.trim();
    if (!text) return;
    await updateDoc(doc(db, "posts", id), {
      comments: arrayUnion({ uid: currentUser.uid, username: currentUser.displayName || "Ẩn danh", text, createdAt: new Date().toISOString() })
    });
    input.value = '';
  });
}

btnProfile.addEventListener('click', () => signOut(auth));
