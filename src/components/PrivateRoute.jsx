import { Navigate, Outlet } from "react-router";
import useAuthStatus from "../hooks/useAuthStatus";

function PrivateRoute() {
  const isLogged = useAuthStatus();

  if (!isLogged) {
    return <h2>Loading...</h2>;
  }

  return isLogged ? <Outlet /> : <Navigate to={"/sign-in"} />;
}

export default PrivateRoute;
