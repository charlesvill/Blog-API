import { useContext, } from "react";
import { Navigate } from "react-router-dom";
import { Authorization } from "./authProvider";


export default function ProtectedRoute({children}){
  const {user} = useContext(Authorization);
  console.log("protected route user value: ", user);
  // return <p>{user.first_name}</p>
  // return (
  //   user ? children : <Navigate to="/login" replace />
  // )
}
