window.likePost = async function(postId){

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
likes:(data.likes || 0)+1
}
);

await loadFeed();

};
