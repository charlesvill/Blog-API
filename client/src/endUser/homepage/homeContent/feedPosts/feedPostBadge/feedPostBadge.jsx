import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./feedPostBadge.module.css";

export function FeedPostBadge({ data }) {
  const navigate = useNavigate();
  const previewLength = 20;

  console.log(data);
  function handlePostClick(e) {
    e.preventDefault();
    navigate(`/posts/${data.id}`);
  }

  return (
    <div
      onClick={handlePostClick}
      className={styles.dataContainer}
    >
      <img src={data.img_url} />
      <h3>{data.title}</h3>
      <p>{data.content.substring(0, previewLength)}</p>
    </div>
  );
}
