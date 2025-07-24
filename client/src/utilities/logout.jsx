import { useContext } from "react";
import { Authorization } from "./authProvider";
import { useNavigate } from "react-router-dom";

export const LogOut = () => {
  const { logOut } = useContext(Authorization);
  const navigate = useNavigate();

  function handleLogOut() {

    logOut();
    navigate("/", { replace: true });

  }


  return (
    <div>
      <span>Would you like to log out?</span>
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  )
}
