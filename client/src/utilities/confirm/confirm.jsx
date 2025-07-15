import React from "react";
import { confirmable, createConfirmation } from "react-confirm";
import styles from './confirm.module.css'

const Dialog = ({ message, show, proceed }) => (
  <div className={`${styles.dialogOverlay} ${show ? styles.show : styles.hide}`}>
    <div className={styles.dialog}>
      <p>{message}</p>
      <button onClick={() => proceed(true)}>Yes</button>
      <button onClick={() => proceed(false)}>No</button>
    </div>
  </div>
);




export const confirmDialog = createConfirmation(confirmable(Dialog));
