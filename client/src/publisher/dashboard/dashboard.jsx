import { Header } from "./header/header.jsx"
import { SideNav } from "./sideNav/sideNavbar.jsx"
import { Announcements } from "./announcements"
import styles from "./dashboard.module.css"
import { useState, useEffect, useContext } from "react"
import { Outlet } from "react-router-dom"
import { apiFetch, clientHostName, serverHostName } from "../../utilities/apiUtils.js"
import { Authorization } from "../../utilities/authProvider.jsx"



export const Dashboard = () => {

  const { user, loading, setLoading } = useContext(Authorization);
  const [posts, setPosts] = useState(null);


  useEffect(() => {
    async function fetchData() {
      if (!user) {
        return;
      }

      const url = serverHostName() + '/posts/' + user.id;
      console.log(url);
      const fetchAllPosts = await apiFetch(url);
      setPosts(fetchAllPosts);
      setLoading(false);
    }
    setLoading(true);
    fetchData();
  }, [user]);



  return (
    !loading &&
    <div className={styles.dashCont}>
      dashboard container
      <SideNav />
      <Header />
      <div className={styles.contentCont}>
        content container
        <Outlet context={{ posts }} />
      </div>
    </div>
  )
}


