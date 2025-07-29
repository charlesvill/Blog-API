import { LinkButton } from "./linkButton"

export function ErrorBoundary({error}){

  console.log(error);
  return (
    <div>
      <h1>Error</h1>
      <div>
        {error}
      </div>
      <LinkButton url={"/"} text={"Go Home"} />
    </div>
  )
}
