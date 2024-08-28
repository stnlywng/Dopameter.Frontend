import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./HomePage";
import ErrorPage from "./ErrorPage";
import LandingPage from "./LandingPage";
import PrivateRoutes from "./PrivateRoutes";
import InfoPage from "./InfoPage";
import TopBar from "../components/TopBar/TopBar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [{ path: "", element: <LandingPage /> }],
  },
  {
    element: <PrivateRoutes />,
    children: [{ path: "home", element: <HomePage /> }],
  },
  {
    path: "/info",
    element: (
      <>
        <TopBar />
        <InfoPage />
      </>
    ),
  },
]);

export default router;
