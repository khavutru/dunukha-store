window.likePost = async function(postId){

try{

const user =
auth.currentUser;

if(!user){

alert("Hãy đăng nhập");

return;

}

const postRef =
doc(db,"posts",postId);

const postSnap =
await getDoc(postRef);

if(!postSnap.exists()) return;

const data =
postSnap.data();

await setDoc(
postRef,
{
...data,
likes:(data.likes || 0)+1,
lastLikeBy:user.uid,
lastLikeAt:new Date().toISOString()
}
);

await loadFeed();

}catch(error){

console.log(error);

alert(error.message);

}

};
