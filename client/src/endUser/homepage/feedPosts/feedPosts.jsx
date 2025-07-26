import React from "react";
import { useFetchData } from "../../../utilities/useFetchData";
import { serverHostName } from "../../../utilities/apiUtils";
import styles from "./feedPosts.module.css"; 

export function PostMapper({url, className}) {
  const { data, loading, error } = useFetchData(url, null);

  return (
    <div className={styles[`${className}`]}>
      {data.map((post) => (
        <div>{post.title}</div>
      ))}
    </div>
  );
}
