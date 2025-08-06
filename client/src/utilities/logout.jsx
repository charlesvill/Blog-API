import { useContext } from "react";
import { Authorization } from "./authProvider";
import { useNavigate } from "react-router-dom";
import styles from "./logout.module.css";

export const LogOut = () => {
  const { logOut } = useContext(Authorization);
  const navigate = useNavigate();

  function handleLogOut() {
    logOut();
    navigate("/", { replace: true });
  }


  return (
    <div className={styles.parentContainer}>
      <h3>Would you like to log out?</h3>
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  )
}
