import { Header } from "./header"
import { SideNav } from "./sideNavbar"
import { PostCard } from "./postCard"
import { Announcements } from "./announcements"

export const Dashboard = () => {
  return (
    <div>
      dashboard container
      <SideNav />
      <Header />
      <div>
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
