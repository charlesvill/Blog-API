import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import { LinkButton } from "../utilities/linkButton";
import { Authorization } from "../utilities/authProvider";

export default function HomePage() {
  const { user, mode } = useContext(Authorization);

  return (
    <>
      Homepage

      <div>
        user: {user && user.first_name}
        <div>
          mode: {mode}
        </div>
      </div>

      <LinkButton url={"/admin"} text={"Admin portal"} />
    </>
  )

}
