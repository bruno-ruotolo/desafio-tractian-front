import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { auth } = useContext(AuthContext);
  if (!(auth && auth.token))
    console.log("Session is Expired or Invalid", "Please, Login Again!");
  return auth && auth.token ? children : <Navigate to="/" />;
}
