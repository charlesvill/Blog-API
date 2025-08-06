import { apiFetch, clientHostName } from "./apiUtils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../endUser/header/clientHeader";
import styles from "./logout.module.css";

export function SignUp() {
  const [userInput, setUserInput] = useState({});
  const createUserUrl = import.meta.env.VITE_LOCAL_GET_USER;
  const navigate = useNavigate();

  function handleUpdate(e) {
    const fieldName = e.target.id;
    const value = e.target.value;

    setUserInput({ ...userInput, [fieldName]: value });
  }

  async function handleSignUp(e) {
    e.preventDefault();
    const response = await apiFetch(createUserUrl, null, userInput, "POST");

    if (response instanceof Error) {
      // error handling
      return;
    }

    navigate("/login", { replace: true });

    console.log("response result was ", response);
  }

  return (
    <>
      <Header />
      <div className={styles.parentContainer}>
        <form className={styles.signUpForm}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" onChange={handleUpdate} />
          <label htmlFor="first_name">First Name</label>
          <input type="text" id="first_name" onChange={handleUpdate} />
          <label htmlFor="last_name">Last Name</label>
          <input type="text" id="last_name" onChange={handleUpdate} />
          <hr className={styles.lineBreak} />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={handleUpdate} />
          <label htmlFor="confirm_pass">Confirm Password</label>
          <input type="password" id="confirm_pass" onChange={handleUpdate} />
          <button type="submit" onClick={handleSignUp}>
            Create Account
          </button>
        </form>
      </div>
    </>
  );
}
