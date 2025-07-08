import { Link } from "react-router-dom"

export function NotFound() {
  return (
    <div>
      <h1>
        404: Not Found
      </h1>
      <h3>
        The page you requested does not exist
      </h3>

      <Link to={"/"}>
        Return Home
      </Link>
    </div>
  );
}

