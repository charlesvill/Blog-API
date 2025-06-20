import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { apiFetch, clientHostName } from "../../utilities/apiUtils";
import { Authorization } from "../../utilities/authProvider";

// api endpoint: /posts/:userid method: post
//  
export const postForm = () => {
  const { user } = useContext(Authorization);
  const [data, setData] = useState(new Object);
  const ApiUrl = clientHostName() + '/posts/' + user.id;


  function handleInput(e){
    fieldName = e.target.id;
    const value = e.target.value;

    setData({...data, [fieldName] : value});
  }

  async function handlePost(e){
    e.preventDefault();

    const postResponse = await apiFetch(
      ApiUrl,
      "POST",
      {"Content-Type": "application/json"},
      data
    );
    
    useNavigate("/admin")
  }

  return (
    <div>

      <form>
        <label for="title">Title</label>
        <input type="text" id="title" value={data?.title} onChange={handleInput}/>
        <label for="content">Body</label>
        <input type="text" id="content" value={data?.content} onChange={handleInput}/>
        <button type="submit">Review</button>
      </form>
      

    </div>

  )
}
