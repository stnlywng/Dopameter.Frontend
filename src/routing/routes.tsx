import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./HomePage";
import LoginSignUpPage from "./LoginSignUpPage";
import ErrorPage from "./ErrorPage";
import LandingPage from "./LandingPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            { path: "", element: <LandingPage /> },
            { path: "home", element: <HomePage /> },
            { path: "login", element: <LoginSignUpPage /> },
        ],
    },
]);

export default router;
