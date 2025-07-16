import { Header } from "./header/header.jsx"
import { SideNav } from "./sideNav/sideNavbar.jsx"
import { Announcements } from "./announcements"
import styles from "./dashboard.module.css"
import { useState, useEffect, useContext } from "react"
import { Outlet } from "react-router-dom"
import { apiFetch, clientHostName, serverHostName } from "../../utilities/apiUtils.js"
import { Authorization } from "../../utilities/authProvider.jsx"
import { useFetchData } from "../../utilities/useFetchData.jsx"



export const Dashboard = () => {

  const { user } = useContext(Authorization);
  const [posts, setPosts] = useState(null);
  const [shouldReload, setReload] = useState(false);
  const url = serverHostName() + '/posts/' + user.id;

  const { data, loading, error } = useFetchData(url);

  // function filterPosts(id) {
  //   const filteredPosts = posts.filter((post) => post.id !== id);
  //   setPosts(filteredPosts);
  // }



  // useEffect(() => {

  //   async function fetchData() {

  //     console.log(url);
  //     const fetchAllPosts = await apiFetch(url);
  //     setPosts(fetchAllPosts);
  //   }
  //   fetchData();
  //   setReload(false);
  // }, [user, shouldReload]);



  return (
    !loading &&
    <div className={styles.dashCont}>
      dashboard container
      <SideNav />
      <Header />
      <div className={styles.contentCont}>
        content container
        <Outlet context={{ data, setReload }} />
      </div>
    </div>
  )
}


