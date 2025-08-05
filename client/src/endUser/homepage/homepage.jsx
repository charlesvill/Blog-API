import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { LinkButton } from "../../utilities/linkButton";
import { Authorization } from "../../utilities/authProvider";
import styles from "./homepage.module.css";
import { Header } from "../header/clientHeader";

export default function HomePage() {
  const { user, mode } = useContext(Authorization);

  return (
    <div className={styles.homeCont}>
      <Header />
      <Outlet context={{ user }} />
    </div>
  );
}
