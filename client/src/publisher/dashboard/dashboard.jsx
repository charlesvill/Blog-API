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
  const url = serverHostName() + "/posts/user/" + user.id;

  const { data, loading, error } = useFetchData(url, shouldReload);

  useEffect(() => {
    if (shouldReload) {
      setReload(false);
    }
  }, [shouldReload]);

  return (
    !loading && (
      <div className={styles.dashCont}>
        <SideNav />
        <Header user={user}/>
        <div className={styles.contentCont}>
          <Outlet context={{ data, setReload }} />
        </div>
      </div>
    )
  );
};
