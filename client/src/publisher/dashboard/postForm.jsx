import React, { useState, useContext } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { apiFetch, serverHostName } from "../../utilities/apiUtils";
import { Authorization } from "../../utilities/authProvider";

// api endpoint: /posts/:userid method: post

export const PostForm = () => {
    const apiUrl = serverHostName() + "/posts/" + user.id;

  

 

  return (
    <div>
      <form>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={data.title}
          onChange={handleInput}
        />
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
        <button type="submit" onClick={handlePost}>
          Review
        </button>
      </form>
    </div>
  );
};
