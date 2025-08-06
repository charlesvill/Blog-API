import React, { useState, useContext, useEffect } from "react";
import { useFetchData } from "../../utilities/useFetchData"
import { serverHostName, apiFetch } from "../../utilities/apiUtils";
import { useParams } from "react-router-dom";
import { Authorization } from "../../utilities/authProvider";
import { CommentForm } from "./comments/commentForm";
import { CommentMapper } from "./comments/commentMapper";
import styles from "./Post.module.css";

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

  useEffect(() => {
    if (reload) {
      setReload(false);
    }

  }, [reload]);

  const { data } = useFetchData(url, reload);

  console.log(data);
  async function handleLike(){
    const url = serverHostName() + `/posts/${postid}/like/${user.id}`;
    const response = await apiFetch(
      url,
      token,
      null,
      "PUT",
    );
    // should be some visual toggle for like
    // toggle
  }

  return (
    data && (
      <div className={styles.postContainer}>
        <h2>{data.title}</h2>
        {user && <button onClick={handleLike}>Like</button>}
        <img src={data.img_url} alt={`image for ${data.title}`} />
        <p>
          {data.content}
        </p>
        <hr/>
        <CommentMapper comments={data.comments} />
        <CommentForm setReload={setReload} postid={postid} user={user} token={token} />
      </div>
    )
  )
}
