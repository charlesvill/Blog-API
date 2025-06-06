import { useContext } from "react"
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
    </>
  )

}
