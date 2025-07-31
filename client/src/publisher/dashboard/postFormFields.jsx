import React from "react";

export function PostFormFields({data, handleInput}) {
  return (
    <>
      <label htmlFor="title">Title</label>
      <input type="text" id="title" value={data.title} onChange={handleInput} />
      <label htmlFor="content">Body</label>
      <textarea
        rows="5"
        cols="33"
        type="text"
        id="content"
        value={data.content}
        onChange={handleInput}
      />
      <label htmlFor="img_url">Image Url</label>
      <input type="text" id="img_url" onChange={handleInput} />
    </>
  );
}
