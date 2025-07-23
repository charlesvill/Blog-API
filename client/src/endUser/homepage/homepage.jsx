import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { LinkButton } from "../../utilities/linkButton";
import { Authorization } from "../../utilities/authProvider";
import styles from "./homepage.module.css";
import { Header } from "../header/clientHeader";
import { apiFetch, serverHostName } from "../../utilities/apiUtils";

export default function HomePage() {
  const { user, mode } = useContext(Authorization);

  useEffect(()=> {
    async function fetchData(){
      if (!user){
        return;
      }

      const url = serverHostName() + '/posts';
      console.log("url for fetch: ", url);

    }


  },[user])
  return (
    <div className={styles.homeCont}>
      user: {user && user.first_name}
      <Header />
      <div className={styles.contentCont}>
      </div>

      {/* content container  */}
      <LinkButton url={"/admin"} text={"Admin portal"} />
    </div>
  )
}

