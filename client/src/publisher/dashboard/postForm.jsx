import { useState, useContext } from "react"
import { useNavigate, useOutletContext } from "react-router-dom";
import { apiFetch, serverHostName } from "../../utilities/apiUtils";
import { Authorization } from "../../utilities/authProvider";

// api endpoint: /posts/:userid method: post

export const PostForm = () => {
  const { user, token } = useContext(Authorization);
  const { setReload } = useOutletContext();
  const [data, setData] = useState({ title: "", content: "" });
  const apiUrl = serverHostName() + '/posts/' + user.id;
  const navigate = useNavigate();

  function handleInput(e) {
    const fieldName = e.target.id;
    const value = e.target.value;

    setData({ ...data, [fieldName]: value });
  }

  async function handlePost(e) {
    e.preventDefault();

    const postResponse = await apiFetch(
      apiUrl,
      token,
      data,
      "POST",
    );

    console.log("we have a post attempt");

    setReload(true);
    navigate("/admin");
  }

  return (
    <div>
      <form>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" value={data.title} onChange={handleInput} />
        <label htmlFor="content">Body</label>
        <input type="text" id="content" value={data.content} onChange={handleInput} />
        <button type="submit" onClick={handlePost}>Review</button>
      </form>
    </div>
  )
}
