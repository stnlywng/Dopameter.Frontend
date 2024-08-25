import React from "react";
import ApiTestComponent from "../components/ApiTestComponent";

const LandingPage = () => {
    return (
        <>
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
        </>
    );
};

export default LandingPage;
