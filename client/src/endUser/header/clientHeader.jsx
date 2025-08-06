import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Authorization } from "../../utilities/authProvider";
import { LinkButton } from "../../utilities/linkButton";
import { UserNav } from "./userNav/userNav";
import styles from "./clientHeader.module.css";

export function Header() {
  const navigate = useNavigate();
  const { user } = useContext(Authorization);
  function handleClick(){
    navigate('/', {replace: true});
  }

  return (
    <header>
      <h1 onClick={handleClick}>BLOG</h1>
      <div className={styles.userCont}>
        {!user ? (
          <LinkButton url={"/login"} text={"Log In"} />
        ) : (
          <UserNav name={user.first_name} />
        )}
      </div>
    </header>
  );
}
