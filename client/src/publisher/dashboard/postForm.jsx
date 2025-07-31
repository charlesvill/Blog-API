import React from "react";
import { PostFormFields } from "./postFormFields";
import { usePostForm } from "./usePostForm";

// api endpoint: /posts/:userid method: post

export const PostForm = () => {
  const { handleInput, handlePost, data } = usePostForm();

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
