import React from "react";
import { useFetchData } from "../../../../utilities/useFetchData";
import { FeedPostBadge } from "./feedPostBadge/feedPostBadge";
import styles from "./feedPosts.module.css";


export function PostMapper({ url, className, title }) {
  const { data, loading, error } = useFetchData(url, null);

  return (

    <div className={styles.mapContainer}>
      {title && <h3>{title}</h3>}
      <div className={styles[className]}>
        {data && data.map((post) => <FeedPostBadge data={post} key={post.id} />)}
      </div>
    </div>

  );
}
