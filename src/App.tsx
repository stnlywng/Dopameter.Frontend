import { useState } from "react";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import TopBar from "./components/TopBar/TopBar";
import theme from "./theme";
import ApiTestComponent from "./components/ApiTestComponent";
import { UserProvider, useUser } from "./state-management/contexts/userContext";

function App() {
    const [count, setCount] = useState(0);

    return (
        <UserProvider>
            <ChakraProvider theme={theme}>
                <TopBar />
                <div style={{ paddingTop: "60px" }}>
                    {" "}
                    {/* Add padding equivalent to the top bar height */}
                    {/* Your other content here */}
                    <h1>Welcome to My Page</h1>
                    <p>This content is now visible below the top bar.</p>
                </div>
                <div>
                    <ApiTestComponent />
                </div>
            </ChakraProvider>
        </UserProvider>
    );
}

export default App;
