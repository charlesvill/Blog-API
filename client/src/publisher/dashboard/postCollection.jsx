import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import { PostBadge } from "./postBadge/postBadge.jsx"

export function PostCollection() {
  const { posts, filterPosts, setReload } = useOutletContext();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div>
      <div>All Posts</div>
      {posts && posts.map(post => <PostBadge
        post={post}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        deletePostFn={filterPosts}
        reloadParent={setReload}
        key={post.id}
      />)}
    </div>
  )
}
