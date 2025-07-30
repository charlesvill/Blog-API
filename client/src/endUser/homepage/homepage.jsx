import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { LinkButton } from "../../utilities/linkButton";
import { Authorization } from "../../utilities/authProvider";
import styles from "./homepage.module.css";
import { Header } from "../header/clientHeader";

export default function HomePage() {
  const { user, mode } = useContext(Authorization);

  return (
    <div className={styles.homeCont}>
      user: {user && user.first_name}
      <Header />
      <Outlet context={{ user }}/>
      <LinkButton url={"/admin"} text={"Admin portal"} />
    </div>
  );
}
