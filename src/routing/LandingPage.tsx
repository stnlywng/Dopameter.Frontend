import ApiTestComponent from "../components/ApiTestComponent";
import styles from "./LandingPage.module.css"; // Create a CSS file for styles
import { useNavigate } from "react-router-dom";
import { Box, Button, Image } from "@chakra-ui/react";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles["landing-page"]}>
        <div className={styles["background-animation"]}>
          {
            <Image
              boxSize="100%"
              objectFit="cover"
              src="/src/assets/background.png"
              alt="Dan Abramov"
              opacity={1}
              filter="brightness(.2)"
            />
          }
        </div>
        <div className={styles["content"]}>
          <div style={{ paddingTop: "20px" }} />
          <h1>Welcome to Dopameter!</h1>
          <h3>
            Overcoming addiction and dopamine imbalance one day at a time.
          </h3>
          <div style={{ paddingTop: "30px" }} />
          <Button
            borderColor={"white"}
            color={"white"}
            borderRadius={12}
            borderWidth={2}
            background={"transparent"}
            onClick={() => navigate("/info")}
            size={"lg"}
            _hover={{
              backgroundColor: "#fafafa",
              color: "black",
              borderColor: "black",
            }}
            width={188}
          >
            How it works.
          </Button>
          <Button
            borderColor={"white"}
            color={"white"}
            borderRadius={12}
            borderWidth={2}
            background={"transparent"}
            onClick={() => navigate("/info")}
            size={"lg"}
            ml={3}
            _hover={{
              backgroundColor: "#fafafa",
              color: "black",
              borderColor: "black",
            }}
            width={188}
          >
            See a Demo.
          </Button>
        </div>
        <div>
          <ApiTestComponent />
        </div>
      </div>
      <div className={styles["footer"]}>
        <p>©2024 Dopameter</p>
      </div>
    </>
  );
};

export default LandingPage;
