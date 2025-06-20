import { useOutletContext } from "react-router-dom";
import { PostBadge } from "./postBadge/postBadge.jsx"

export function PostCollection() {
  const { posts } = useOutletContext();
  return (
    <div>
      <div>All Posts</div>
      {posts && posts.map(post => <PostBadge post={post} key={post.id} />)}
    </div>
  )
}
