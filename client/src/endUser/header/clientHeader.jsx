import { useContext } from "react"
import { Authorization } from "../../utilities/authProvider"
import { LinkButton } from "../../utilities/linkButton";

export function Header() {
  const { user } = useContext(Authorization);

  return (
    <div>
      this is the header for client
      {!user ? <LinkButton url={'/login'} text={"Log In"} /> : user.first_name}
    </div>
  )
}


