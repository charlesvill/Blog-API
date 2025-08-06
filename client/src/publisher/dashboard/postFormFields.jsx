import React from "react";
import { usePostForm } from "./usePostForm";
// import styles from "./postForm.module.css";

export function PostFormFields({ httpMethod, id, initData }) {
  const { handleInput, handlePost, fieldData } = usePostForm(
    httpMethod,
    id,
    initData,
  );
  console.log(fieldData);
  return (
    fieldData && (
      <>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={fieldData.title}
          onChange={handleInput}
        />
        <label htmlFor="content">Body</label>
        <textarea
          rows="25"
          cols="33"
          type="text"
          id="content"
          value={fieldData.content}
          onChange={handleInput}
        />
        <label htmlFor="img_url">Image Url</label>
        <input
          type="text"
          id="img_url"
          onChange={handleInput}
          value={fieldData.img_url}
        />
        <button type="submit" onClick={handlePost}>
          Review
        </button>
      </>
    )
  );
}
