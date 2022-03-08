import {useState,useEffect} from 'react'
import {db} from './firebase'
export const Post=({user,caption,url,postId})=>{
const[comments,setComments]=useState()
const[comment,setComment]=useState()
      useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          //listener for comments
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: new Date(),
    });
    setComment("");
  };

    return(
        <>
<div className="post">
<p>{caption&&caption}</p>
<img src={url} alt='' width='200'/>
<div className="post__comments">
        {comments?.map((comment) => (
          <p>
            <strong>{comment.username} </strong>
            {comment.text}
          </p>
        ))}
      </div>
      {user && (
        <form className="post__commentBox">
          <input
            className="post__input"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="post__button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            Post
          </button>
        </form>
      )}
</div>
</>
    )
}
export default Post