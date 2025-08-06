import { useState } from "react";
import { apiFetch, serverHostName } from "../../../utilities/apiUtils";
import styles from "./commentForm.module.css";

export function CommentForm({ setReload, postid, user, token }) {
  const [commentField, setField] = useState({});

  function handleInput(e) {
    const field = e.target.id;
    const value = e.target.value;

    setField({ ...commentField, [field]: value });
  }

  async function handlePostComment(e) {
    // api url for posting a comment 
    // postRouter.post("/:postid/comments/:userid", postComment);
    e.preventDefault();
    const url = serverHostName() + `/posts/${postid}/comments/${user.id}`;

    if (commentField.length === 0) {
      return;
    }
    // check if comment contains actual text
    const containsText = commentField.content
      .split('')
      .some(char => char.charCodeAt(0) !== 32);

    if (!containsText) {
      return;
    }

    // url, token, body, method, headers 
    const response = await apiFetch(url, token, commentField, "POST").then((response) => {
      setReload(true)
      setField({});
      console.log(response);
      console.log("we have a response");
    }
    );
  }

  function handleClearField(e) {
    e.preventDefault();

    setField({});
  }
  return (
    user ? (
      <form className={styles.commentForm}>
        <label htmlFor="content">Leave a comment</label>
        <textarea id="content" cols={80} rows={5} value={commentField.content || ""} onChange={handleInput}></textarea>
        <div>
          <button onClick={handlePostComment} type="submit">Comment</button>
          <button onClick={handleClearField}>cancel</button>
        </div>
      </form >) : (<span>Sign in to leave a comment</span>)
  )
}
