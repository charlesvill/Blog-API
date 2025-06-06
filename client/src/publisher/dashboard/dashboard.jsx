import { Header } from "./header/header.jsx"
import { SideNav } from "./sideNav/sideNavbar.jsx"
import { PostCard } from "./postCard"
import { Announcements } from "./announcements"
import styles from "./dashboard.module.css"

export const Dashboard = () => {
  return (
    <div className={styles.dashCont}>
      dashboard container
      <SideNav />
      <Header />
      <div className={styles.contentCont}>
        content container
        <div>
          left side (3 fractions grid-template column)
          <div>
            heading container
          </div>
          <div>
            cards container
            map over collection of posts
            <PostCard />
          </div>
        </div>
        <div>
          right side container (1 fractional grid template column)
          <div>
            heading container
          </div>
          <Announcements />
        </div>
      </div>
    </div>

  )
}
