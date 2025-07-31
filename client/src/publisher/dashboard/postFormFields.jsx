import React from "react";
import { usePostForm } from "./usePostForm";

export function PostFormFields({ id, initData }) {
  const { handleInput, handlePost, fieldData } = usePostForm(
    "PUT",
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
          rows="5"
          cols="33"
          type="text"
          id="content"
          value={fieldData.content}
          onChange={handleInput}
        />
        <label htmlFor="img_url">Image Url</label>
        <input type="text" id="img_url" onChange={handleInput} />
        <button type="submit" onClick={handlePost}>
          Review
        </button>
      </>
    )
  );
}
