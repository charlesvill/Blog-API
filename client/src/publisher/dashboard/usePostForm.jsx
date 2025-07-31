import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { apiFetch, serverHostName } from "../../utilities/apiUtils";
import { Authorization } from "../../utilities/authProvider";

export function usePostForm(httpMethod="POST", id=null) {
  const { user, token } = useContext(Authorization);
  const { setReload } = useOutletContext();
  const [data, setData] = useState({ title: "", content: "", img_url: "" });

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      //distinguish between a post id that must be passed or a user id 
      const url = serverHostName() + "/posts/" + id ? id : user.id;
      console.log("url in the post form: ", url);
    }
  }, [user]);

  function handleInput(e) {
    const fieldName = e.target.id;
    const value = e.target.value;

    setData({ ...data, [fieldName]: value });
  }

  async function handlePost(e) {
    e.preventDefault();

    await apiFetch(url, token, data, httpMethod);

    setReload(true);
    navigate("/admin");
  }

  return {
    handleInput,
    handlePost,
    data,
  };
}
