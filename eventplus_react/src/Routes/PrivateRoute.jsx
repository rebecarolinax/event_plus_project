import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children, redirectTo = "/" }) => {
  const isAuthenicaded = localStorage.getItem("token") !== null;

  return isAuthenicaded ? children : <Navigate to={redirectTo} />;
};
