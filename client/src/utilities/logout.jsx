import { useContext } from "react";
import { Authorization } from "./authProvider";

export const LogOut = () => {
  const { logOut } = useContext(Authorization);

  return (
    <div>
      <button onClick={ logOut }>Log Out</button>
    </div>
  )
}
