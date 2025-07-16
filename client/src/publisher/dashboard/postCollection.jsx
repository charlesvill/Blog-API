import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import { PostBadge } from "./postBadge/postBadge.jsx"

export function PostCollection() {
  const { data, setReload } = useOutletContext();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div>
      <div>All Posts</div>
      {data && data.map(post => <PostBadge
        post={post}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        reloadParent={setReload}
        key={post.id}
      />)}
    </div>
  )
}
