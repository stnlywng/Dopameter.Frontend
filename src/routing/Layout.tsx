// Layout.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import TopBar from "../components/TopBar/TopBar";
import { isAuthenticated } from "../utils/auth";

const Layout: React.FC = () => {
  const isAuth = isAuthenticated();

  if (isAuth) {
    return <Navigate to="/home" />;
  }

  return (
    <>
      <TopBar />
      <Outlet />
    </>
  );
};

export default Layout;
