import React from "react";
import { Header } from "./header/header.jsx";
import { SideNav } from "./sideNav/sideNavbar.jsx";
import { Announcements } from "./announcements";
import styles from "./dashboard.module.css";
import { useState, useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import { serverHostName } from "../../utilities/apiUtils.js";
import { Authorization } from "../../utilities/authProvider.jsx";
import { useFetchData } from "../../utilities/useFetchData.jsx";

export const Dashboard = () => {
  const { user } = useContext(Authorization);
  const [shouldReload, setReload] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const url = serverHostName() + "/posts/user/" + user.id;

  const { data, loading, error } = useFetchData(url, shouldReload);

  useEffect(() => {
    if (shouldReload) {
      setReload(false);
    }
  }, [shouldReload]);

  function toggleNav() {
    console.log("current state of sideNav: ", showNav);
    if (showNav) {
      setShowNav(false);
      return;
    }
    setShowNav(true);
  }

  return (
    !loading && (
      <div className={styles.dashCont}>
        <SideNav showNav={showNav} toggleNav={toggleNav} />
        <Header user={user} toggleNav={toggleNav} />
        <div className={styles.contentCont}>
          <Outlet context={{ data, setReload }} />
        </div>
      </div>
    )
  );
};
