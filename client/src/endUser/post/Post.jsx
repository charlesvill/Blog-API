import React, { useState, useContext, useEffect } from "react";
import { useFetchData } from "../../utilities/useFetchData"
import { serverHostName } from "../../utilities/apiUtils";
import { useParams } from "react-router-dom";
import { Authorization } from "../../utilities/authProvider";
import { apiFetch } from "../../utilities/apiUtils";

// heading, image frame, content
// comments mapper component
// post comment form
// handle comment post function
// like post function
export function Post() {
  const { user, token } = useContext(Authorization);
  const { postid } = useParams();
  const [reload, setReload] = useState(false);
  const url = serverHostName() + "/posts/" + postid;

  useEffect(()=>{
    if(reload){
      setReload(false);
    }

  }, [reload]);

  const { data, loading, error } = useFetchData(url, reload);
  function CommentMapper({comments}) {
    console.log( comments);
    return (
      <section>
        {comments && comments.map(comment => <span key={comment.id}>{comment.content}</span>)}
      </section>
    )
  }

  function CommentForm({setReload}) {
    const [commentField, setField] = useState({});

    function handleInput(e) {
      const field = e.target.id;
      const value = e.target.value;

      setField({ ...commentField, [field]: value });
    }

    async function handlePostComment(e) {
      // api url for posting a comment 
      // postRouter.post("/:postid/comments/:userid", postComment);
      const url = serverHostName() + `/posts/${postid}/comments/${user.id}`;

      // url, token, body, method, headers 
      e.preventDefault();
      const response = await apiFetch(url,token, commentField, "POST").then(setReload(true)); 
    }

    function handleClearField(e) {
      e.preventDefault();

      setField({});
    }
    return (
      user ? (
        <form>
          <label htmlFor="content">Leave a comment</label>
          <textarea id="content" cols={30} rows={20} value={commentField.content || ""} onChange={handleInput}></textarea>
          <div>
            <button onClick={handlePostComment} type="submit">Comment</button>
            <button onClick={handleClearField}>cancel</button>
          </div>
        </form >) : (<span>Sign in to leave a comment</span>)
    )
  }

  return (
    data && (
      <div>
        <h2>{data.title}</h2>
        <img src={data.img_url} alt={`image for ${data.title}`} />
        <p>
          {data.content}
        </p>
        <CommentMapper comments={data.comments} />
        <CommentForm setReload={setReload}/>
      </div>
    )
  )
}
