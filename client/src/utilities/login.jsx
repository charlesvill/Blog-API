import { useState } from "react"
import { useContext } from "react";
import { Authorization } from "../utilities/authProvider";

export const Login = () => {
  const [userInput, setUserInput] = useState({ username: "", password: "" });
  const { login, user, error } = useContext(Authorization);
  const {vError, setVError} = useState(null);

  function handleUpdate(e) {
    // on every input change, the component needs to re-render to show updated user input
    const fieldName = e.target.id;
    const value = e.target.value;

    setUserInput({ ...userInput, [fieldName]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const url = import.meta.env.VITE_LOCAL_LOGIN;
    // state storing result of fetch

    console.log(url);

    const response = await login(url, userInput);

    if(response instanceof Error){
      setVError(response.message);
      return;
    }
  }

  return (

    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username" >User name</label>
        <input type="text" id="username" onChange={handleUpdate} value={userInput.username} required="true"/>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" onChange={handleUpdate} value={userInput.password} required="true"/>
        <button type="submit"></button>
      </form>
      <div>
        {user && user.first_name}
        {vError && vError}
      </div>
    </div>
  )
};

