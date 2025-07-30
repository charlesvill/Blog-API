import React, { useContext } from "react";
import { Authorization } from "../../utilities/authProvider";
import { LinkButton } from "../../utilities/linkButton";
import { UserNav } from "./userNav/userNav";

export function Header() {
  const { user } = useContext(Authorization);

  return (
    <header>
      <div>Hello world</div>
      <div>empty div for now</div>
      <h1>BLOG</h1>
      <div>
        {!user ? (
          <LinkButton url={"/login"} text={"Log In"} />
        ) : (
          <UserNav name={user.first_name} />
        )}
      </div>
    </header>
  );
}
