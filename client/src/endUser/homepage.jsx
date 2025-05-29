import { useContext } from "react"
import { Context } from "../App";

export default function HomePage () {
  const {user, mode} = useContext(Context);

  return (
    <>
      Homepage

      <div>
        user: {user}
        mode: {mode}
      </div>
    </>
  )

}
