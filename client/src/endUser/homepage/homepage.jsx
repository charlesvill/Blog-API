import React from "react";
import { useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { LinkButton } from "../../utilities/linkButton";
import { Authorization } from "../../utilities/authProvider";
import styles from "./homepage.module.css";
import { Header } from "../header/clientHeader";
import { PostMapper } from "./feedPosts/feedPosts";
import { apiFetch, serverHostName } from "../../utilities/apiUtils";
import { useFetchData } from "../../utilities/useFetchData";

export default function HomePage() {
  const { user, mode } = useContext(Authorization);
  const url = serverHostName() + "/posts";
  const { data, loading, error } = useFetchData(url, user);

  

  return (
    <div className={styles.homeCont}>
      user: {user && user.first_name}
      <Header />
      <div className={styles.contentCont}>
        <PostMapper url={/* featured url */} className={""} />
        <PostMapper url={/* first 10 url */} className={""} />
      </div>
      <LinkButton url={"/admin"} text={"Admin portal"} />
    </div>
  );
}
