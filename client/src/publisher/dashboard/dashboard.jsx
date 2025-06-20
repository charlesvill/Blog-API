import { Header } from "./header/header.jsx"
import { SideNav } from "./sideNav/sideNavbar.jsx"
import { PostCard } from "./postCard"
import { Announcements } from "./announcements"
import styles from "./dashboard.module.css"
import { useState, useEffect, useContext } from "react"
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
        <p>Your Projects</p>
        {posts && posts.map(post => <PostCard post={post} />)}
      </div>
    </div>
  )
}

// <div>
//         left side (3 fractions grid-template column)
//         <div>
//           heading container
//         </div>
//         <div>
//           cards container
//           map over collection of posts
//           <PostCard />
//         </div>
//       </div>
//       <div>
//         right side container (1 fractional grid template column)
//         <div>
//           heading container
//         </div>
//         <Announcements />
//       </div>
