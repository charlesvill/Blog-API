import { useContext } from "react";
import { Authorization } from "./authProvider";
import { Navigate } from "react-router-dom";

export function AuthGate({ children }) {
  const { initializing, user } = useContext(Authorization);

  if (initializing) {
    return <div>Loading...</div>
  }

  return user ? children : <Navigate to="/login" replace />
}
