import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { apiFetch, serverHostName } from "../../utilities/apiUtils";
import { Authorization } from "../../utilities/authProvider";

export function usePostForm(
  httpMethod = "POST",
  id = null,
  initFieldData = null,
) {
  const { user, token } = useContext(Authorization);
  const { setReload } = useOutletContext();
  const [fieldData, setData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (httpMethod === "PUT" && initFieldData) {
      setData(initFieldData);
    } else {
      setData({ title: "", content: "", img_url: "" });
    }
  }, [initFieldData, httpMethod]);

  useEffect(() => {
    if (user) {
      //distinguish between a post id that must be passed or a user id
      const url = serverHostName() + "/posts/" + (id ?? user.id);
      console.log("url in the post form: ", url);
    }
  }, [user, id]);

  function handleInput(e) {
    const fieldName = e.target.id;
    const value = e.target.value;

    setData({ ...fieldData, [fieldName]: value });
  }

  async function handlePost(e) {
    e.preventDefault();

    const url = serverHostName() + "/posts/" + (id ?? user.id);
    console.log("url to fetch: ", url);
    await apiFetch(url, token, fieldData, httpMethod);

    setReload(true);
    navigate("/admin");
  }

  return {
    handleInput,
    handlePost,
    fieldData,
  };
}
