import { Navigate, Outlet } from "react-router-dom";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { UserProvider } from "../state-management/contexts/userContext";
import TopBar from "../components/TopBar/TopBar";
import { isAuthenticated } from "../utils/auth";
import { LoginProvider } from "../state-management/contexts/loginContext";

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
