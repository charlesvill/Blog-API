import React, { useState } from "react";
import { LinkButton } from "../../../utilities/linkButton";
import styles from "./userNav.module.css";

export function UserNav({ name }) {
  const [modalActive, setModal] = useState(false);

  function handleToggle(e) {
    e.preventDefault();

    if (modalActive === true) {
      setModal(false);
    } else {
      setModal(true);
    }
  }

  return (
    <nav className={styles.navContainer}>
      <h3 onClick={handleToggle} className={styles.userName}>
        {name}
      </h3>
      {modalActive && (
        <div className={styles.linkContainer}>
          <LinkButton url={"/admin"} text={"Author's Dashboard"} />
          <LinkButton url={"/logout"} text={"Logout"} />
        </div>
      )}
    </nav>
  );
}
