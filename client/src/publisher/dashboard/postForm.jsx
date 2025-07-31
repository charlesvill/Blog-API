import React from "react";
import { PostFormFields } from "./postFormFields";

// api endpoint: /posts/:userid method: post

export const PostForm = () => {

  return (
    <div>
      <form>
        <PostFormFields httpMethod="POST" id={null} initData={null} />
      </form>
    </div>
  );
};
