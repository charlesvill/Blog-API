import React from "react";
import styles from "./homeContent.module.css";
import { serverHostName } from "../../../utilities/apiUtils";
import { PostMapper } from "./feedPosts/feedPosts";


export function HomeContent() {
  const feedUrl = serverHostName() + "/posts";
  const popularUrl = feedUrl + "?popular=true";

  return (
    <div className={styles.contentCont}>
      <PostMapper url={popularUrl} className={"featured"} title={"Featured Posts"} />
      <PostMapper url={feedUrl} className={"feed"} title={"Your Feed"} />
    </div>
  );
}
