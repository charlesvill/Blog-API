import styles from "./header.module.css";
import { LinkButton } from "../../../utilities/linkButton";

export const Header = ({ user, toggleNav }) => {
  return (
    <div className={styles.headerCont}>
      <div className={styles.profileWrapper}>
        <button className={styles.showNavBtn} onClick={toggleNav}>
          ☰
        </button>
        <div className={styles.profileContainer}>
          <span className={styles.iconContainer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="48"
              viewBox="0 -960 960 960"
              width="48"
            >
              <path d="M120-566q0-90 40-165t107-125l36 48q-56 42-89.5 104.5T180-566h-60Zm660 0q0-75-33.5-137.5T657-808l36-48q67 50 107 125t40 165h-60ZM160-200v-60h80v-304q0-84 49.5-150.5T420-798v-22q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v22q81 17 130.5 83.5T720-564v304h80v60H160Zm320-302Zm0 422q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM300-260h360v-304q0-75-52.5-127.5T480-744q-75 0-127.5 52.5T300-564v304Z" />
            </svg>
            <p>Hi! here you can create, edit, and delete posts!</p>
          </span>
        </div>
      </div>
      <div className={styles.greetingWrapper}>
        <div className={styles.greetingContainer}>
          <div>
            <h4 className={styles.greeting}>Good Day,</h4>
            <p>
              <span className={styles.name}>{user.first_name}</span>{" "}
              <span>(@{user.username})</span>
            </p>
          </div>
        </div>
        <div className={styles.linkContainer}>
          <LinkButton url="/admin/create-post" text="Create Post" />
        </div>
      </div>
    </div>
  );
};
