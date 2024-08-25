import TopBar from "../components/TopBar/TopBar";
import { Outlet } from "react-router-dom";
import { UserProvider } from "../state-management/contexts/userContext";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { LoginProvider } from "../state-management/contexts/loginContext";

const Layout = () => {
    return (
        <UserProvider>
            <LoginProvider>
                <ChakraProvider theme={theme}>
                    <TopBar />
                    <Outlet />
                </ChakraProvider>
            </LoginProvider>
        </UserProvider>
    );
};

export default Layout;
