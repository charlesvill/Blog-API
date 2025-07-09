import { useContext, useEffect } from "react";
import { Authorization } from "./authProvider";
import { Navigate, useLocation } from "react-router-dom";

export function AuthGate({ children }) {
  const { initializing, user, path,setPath } = useContext(Authorization);
  const location = useLocation();

  useEffect(() => {
    if (!user && !initializing) {
      console.log("pathname to save: ", location.pathname);
      setPath(location.pathname);
    }
  }, [user, path])

  if (initializing) {
    return <div>Loading...</div>
  }

  if(!user){
    return <Navigate to="/login" replace />
  }

  return children;
}
