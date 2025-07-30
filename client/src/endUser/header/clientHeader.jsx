import React, { useContext } from "react"
import { Authorization } from "../../utilities/authProvider"
import { LinkButton } from "../../utilities/linkButton";
import { UserNav } from "./userNav/userNav";

export function Header() {
  const { user } = useContext(Authorization);

  return (
    <div>
      this is the header for client
      {user && <UserNav name={user.first_name} />}
    </div>
  )
}


