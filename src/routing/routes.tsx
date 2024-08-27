import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./HomePage";
import ErrorPage from "./ErrorPage";
import LandingPage from "./LandingPage";
import PrivateRoutes from "./PrivateRoutes";

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
]);

export default router;
