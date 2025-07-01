import { Link } from "react-router-dom"

export function ErrorBoundary({error}){

  return (
    <div>
      <h1>Error:</h1>
      <div>
        {error.message}
      </div>
    </div>
  )
}
