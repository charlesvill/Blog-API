import styles from "./sideNavbar.module.css"
import { useNavigate } from "react-router-dom"

export const SideNav = () => {
  const navigate = useNavigate();

  function handleDashNav() {
    navigate("/admin");
  }
  function handleHomeNav() {
    navigate("/");
  }
  function handleLogOutNav() {
    navigate("/logout");
  }

  return (
    <div className={styles.navContainer}>
      <div className={styles.headerContainer} onClick={handleDashNav}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21,16V4H3V16H21M21,2A2,2 0 0,1 23,4V16A2,2 0 0,1 21,18H14V20H16V22H8V20H10V18H3C1.89,18 1,17.1 1,16V4C1,2.89 1.89,2 3,2H21M5,6H14V11H5V6M15,6H19V8H15V6M19,9V14H15V9H19M5,12H9V14H5V12M10,12H14V14H10V12Z" /></svg>
        <h3 className={styles.header}>Dashboard</h3>
      </div>
      <div className={styles.linkContainer}>
        <div className={styles.link} onClick={handleHomeNav}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,3L2,12H5V20H19V12H22L12,3M12,8.75A2.25,2.25 0 0,1 14.25,11A2.25,2.25 0 0,1 12,13.25A2.25,2.25 0 0,1 9.75,11A2.25,2.25 0 0,1 12,8.75M12,15C13.5,15 16.5,15.75 16.5,17.25V18H7.5V17.25C7.5,15.75 10.5,15 12,15Z" /></svg>
          <p>Home</p>
        </div>

        <div className={styles.link} onClick={handleLogOutNav}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.1 14.8,9.5V11C15.4,11 16,11.6 16,12.3V15.8C16,16.4 15.4,17 14.7,17H9.2C8.6,17 8,16.4 8,15.7V12.2C8,11.6 8.6,11 9.2,11V9.5C9.2,8.1 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,9.5V11H13.5V9.5C13.5,8.7 12.8,8.2 12,8.2Z" /></svg>
          <p>Logout</p>
        </div>
      </div>
    </div>
  )
}
