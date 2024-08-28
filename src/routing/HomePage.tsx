import ApiTestComponent from "../components/ApiTestComponent";
import TeeterTotter from "../components/TeeterTotter/TeeterTotter";

const HomePage = () => {
  return (
    <div className="landing-page">
      <div className="background-animation">
        {/* Your animated background here */}
      </div>
      <div className="content">
        <div style={{ paddingTop: "60px" }} />
        <TeeterTotter />
      </div>
    </div>
  );
};

export default HomePage;
