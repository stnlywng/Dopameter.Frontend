// main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import { UserProvider } from "./state-management/contexts/userContext";
import { LoginProvider } from "./state-management/contexts/loginContext";
import router from "./routing/routes";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <UserProvider>
        <LoginProvider>
          <RouterProvider router={router} />
        </LoginProvider>
      </UserProvider>
    </ChakraProvider>
  </StrictMode>
);
