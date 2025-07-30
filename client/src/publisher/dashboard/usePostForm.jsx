import React, { useState, useContext } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { apiFetch } from "../../utilities/apiUtils";

export function usePostForm() {
  const { user, token } = useContext(Authorization);
  const { setReload } = useOutletContext();
  const [data, setData] = useState({ title: "", content: "", img_url: "" });
  const [httpMethod, setHttpMethod] = useState("POST");
  const [url, setUrl] = useState(null);

  const navigate = useNavigate();



  function handleInput(e) {
    const fieldName = e.target.id;
    const value = e.target.value;

    setData({ ...data, [fieldName]: value });
  }
  // left off here deciding if i will extract these two fns into one
  async function handlePost(e) {
    e.preventDefault();

    await apiFetch(url, token, data, httpMethod);

    setReload(true);
    navigate("/admin");
  }
  

  return { handleInput, handlePost, setHttpMethod, setUrl};
}
