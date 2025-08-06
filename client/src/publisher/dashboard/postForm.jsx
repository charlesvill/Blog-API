import React from "react";
import { PostFormFields } from "./postFormFields";
import styles from "./postForm.module.css";

export const PostForm = () => {

  return (
    <div>
      <form className={styles.parentContainer}>
        <PostFormFields httpMethod="POST" id={null} initData={null} />
      </form>
    </div>
  );
};
