import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import { PostBadge } from "./postBadge/postBadge.jsx"
import styles from "./postCollection.module.css"

export function PostCollection() {
  const { data, setReload } = useOutletContext();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div>
      <div>Your Posts</div>
      <div className={styles.postCollection}>
        {data && data.map(post => <PostBadge
          post={post}
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          reloadParent={setReload}
          key={post.id}
        />)}
      </div>
    </div>
  )
}
