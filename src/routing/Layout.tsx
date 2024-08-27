// Layout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "../components/TopBar/TopBar";

const Layout: React.FC = () => {
  return (
    <>
      <TopBar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
