import React, { useContext } from "react";
import { Authorization } from "../../utilities/authProvider";
import { LinkButton } from "../../utilities/linkButton";
import { UserNav } from "./userNav/userNav";
import styles from "./clientHeader.module.css";

export function Header() {
  const { user } = useContext(Authorization);

  return (
    <header>
      <h1>BLOG</h1>
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
