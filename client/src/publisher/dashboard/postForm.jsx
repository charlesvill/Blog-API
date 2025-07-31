import React, { useEffect } from "react";
import { serverHostName } from "../../utilities/apiUtils";
import { PostFormFields } from "./postFormFields";
import { usePostForm } from "./usePostForm";

// api endpoint: /posts/:userid method: post

export const PostForm = () => {
  const { handleInput, handlePost, setHttpMethod, setUrl, user, data } =
    usePostForm();

  useEffect(() => {
    setHttpMethod("POST");
    if (user) {
      const url = serverHostName() + "/posts/" + user.id;
      setUrl(url);
      console.log("url in the post form: ", url);
    }
  }, [user]);

  if (user) {
    console.log(user);
  }
  return (
    <div>
      <form>
        <PostFormFields data={data} handleInput={handleInput} />
        <button type="submit" onClick={handlePost}>
          Review
        </button>
      </form>
    </div>
  );
};
