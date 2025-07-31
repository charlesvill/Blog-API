import React from "react";

export function PostFormFields({fieldData, handleInput}) {
  return (
    <>
      <label htmlFor="title">Title</label>
      <input type="text" id="title" value={fieldData.title} onChange={handleInput} />
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
    </>
  );
}
