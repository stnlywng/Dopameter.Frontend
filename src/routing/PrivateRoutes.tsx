import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { UserProvider } from "../state-management/contexts/userContext";
import TopBar from "../components/TopBar/TopBar";

const PrivateRoutes = () => {
    const { user } = useAuth();

    if (false) {
        //!user) {
        return <Navigate to="/login" />;
    }
    return (
        <>
            <UserProvider>
                <ChakraProvider theme={theme}>
                    <TopBar />
                    <Outlet />
                </ChakraProvider>
            </UserProvider>
        </>
    );
};

export default PrivateRoutes;
