import { useEffect, useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Authorization } from "../utilities/authProvider";
import { LinkButton } from "./linkButton";
import styles from "./logout.module.css";

export const Login = () => {
  const [userInput, setUserInput] = useState({ username: "", password: "" });
  const { login, user, path, setPath, error } = useContext(Authorization);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && path) {
      navigate(path, { replace: true });
      setPath(null);
    }
    if(user && !path){
      navigate("/", {replace: true});
    }

  }, [user, path])

  function handleUpdate(e) {
    // on every input change, the component needs to re-render to show updated user input
    e.preventDefault();
    const fieldName = e.target.id;
    const value = e.target.value;

    setUserInput({ ...userInput, [fieldName]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const url = import.meta.env.VITE_LOCAL_LOGIN;

    const response = await login(url, userInput);

    if (response instanceof Error) {
      return;
    }
  }

  return (

    <div className={styles.parentContainer}>

        {error && <span>*{error}</span>}
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <label htmlFor="username" >User name</label>
        <input type="text" id="username" onChange={handleUpdate} value={userInput.username} required={true} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" onChange={handleUpdate} value={userInput.password} required={true} />
        <button type="submit">Log in</button>
      </form>
      <div>
        {!user ? <LinkButton url={"/signup"} text={"New?"}/> : user.first_name}
      </div>
    </div>
  )
};

