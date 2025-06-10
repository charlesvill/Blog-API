import styles from "./header.module.css"

export const Header = () => {
  return (
    <div className={styles.headerCont}>
      <div className={styles.profileWrapper}>
        <div className={styles.profileContainer}>
          <span className={styles.iconContainer}>
            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M120-566q0-90 40-165t107-125l36 48q-56 42-89.5 104.5T180-566h-60Zm660 0q0-75-33.5-137.5T657-808l36-48q67 50 107 125t40 165h-60ZM160-200v-60h80v-304q0-84 49.5-150.5T420-798v-22q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v22q81 17 130.5 83.5T720-564v304h80v60H160Zm320-302Zm0 422q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM300-260h360v-304q0-75-52.5-127.5T480-744q-75 0-127.5 52.5T300-564v304Z" /></svg>
          </span>
          <img src="./assets/svg-avatars/avatar (4).svg" alt="user profile icon" />
          <p>Michael Scott</p>
        </div>
      </div>
      <div className={styles.greetingWrapper}>
        <div className={styles.greetingContainer}>
          <img src="./assets/svg-avatars/avatar (4).svg" alt="user profile icon" />
          <div>
            <p className={styles.greeting}>Good Morning,</p>
            <p className={styles.UserName}>Michael Scott (@bestboss76)</p>
          </div>
        </div>
        <div className={styles.linkContainer}>
          <button>New</button>
        </div>
      </div>
    </div>
  )
}

// <div className={}>
//           <span className={}>
//             <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M796-121 533-384q-30 26-69.959 40.5T378-329q-108.162 0-183.081-75Q120-479 120-585t75-181q75-75 181.5-75t181 75Q632-691 632-584.85 632-542 618-502q-14 40-42 75l264 262-44 44ZM377-389q81.25 0 138.125-57.5T572-585q0-81-56.875-138.5T377-781q-82.083 0-139.542 57.5Q180-666 180-585t57.458 138.5Q294.917-389 377-389Z" /></svg>
//           </span>

//           <form action="" method="get">
//             <label for="searchinput"></label>
//             <input type="search" name="searchbar" id="searchinput"/>
//           </form>
//         </div>
