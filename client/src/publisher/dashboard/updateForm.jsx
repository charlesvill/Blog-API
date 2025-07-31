import React from "react";
import { usePostForm } from "./usePostForm";
import { PostFormFields } from "./postFormFields";
import { useParams } from "react-router-dom";

export function UpdatePostForm() {
  const { postid } = useParams();
  const { handleInput, handlePost, data } = usePostForm("PUT", postid);

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
}
