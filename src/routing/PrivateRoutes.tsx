import { Navigate, Outlet } from "react-router-dom";
import TopBar from "../components/TopBar/TopBar";
import { isAuthenticated } from "../utils/auth";

const PrivateRoutes = () => {
  const isAuth = isAuthenticated();

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <TopBar />
      <Outlet />
    </>
  );
};

export default PrivateRoutes;
