import React, { useState, useContext, useEffect } from "react";
import { useFetchData } from "../../utilities/useFetchData"
import { serverHostName } from "../../utilities/apiUtils";
import { useParams } from "react-router-dom";
import { Authorization } from "../../utilities/authProvider";
import { CommentForm } from "./comments/commentForm";
import { CommentMapper } from "./comments/commentMapper";

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

  return (
    data && (
      <div>
        <h2>{data.title}</h2>
        <img src={data.img_url} alt={`image for ${data.title}`} />
        <p>
          {data.content}
        </p>
        <CommentMapper comments={data.comments} />
        <CommentForm setReload={setReload} postid={postid} user={user} token={token} />
      </div>
    )
  )
}
