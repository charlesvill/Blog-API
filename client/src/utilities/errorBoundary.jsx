import { LinkButton } from "./linkButton"

export function ErrorBoundary({error}){

  return (
    <div>
      <h1>Error</h1>
      <div>
        {error.message}
      </div>
      <LinkButton url={"/"} text={"Go Home"} />
    </div>
  )
}
