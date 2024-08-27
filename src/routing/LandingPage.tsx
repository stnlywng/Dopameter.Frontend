import React from "react";
import ApiTestComponent from "../components/ApiTestComponent";
import "./LandingPage.module.css"; // Create a CSS file for styles

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="background-animation">
        {/* Your animated background here */}
      </div>
      <div className="content">
        <div style={{ paddingTop: "60px" }} />
        <h1>Welcome to Dopameter!</h1>
        <h3>Overcoming addiction and dopamine imbalance one day at a time.</h3>
      </div>
      <div>
        <ApiTestComponent />
      </div>
    </div>
  );
};

export default LandingPage;
