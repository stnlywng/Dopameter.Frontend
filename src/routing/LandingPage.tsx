import styles from "./LandingPage.module.css"; // Create a CSS file for styles
import { useNavigate } from "react-router-dom";
import { Button, Image } from "@chakra-ui/react";
import { useEffect } from "react";
import axiosInstance from "../api/api-client";
import { CanceledError } from "axios";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    axiosInstance
      .get("/health", { signal: controller.signal })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.error("API health check error:", err.message);
      });
    return () => controller.abort();
  }, []);

  return (
    <>
      <div className={styles["landing-page"]}>
        <div className={styles["background-animation"]}>
          {
            <Image
              boxSize="100%"
              objectFit="cover"
              src="/src/assets/background.png"
              alt="background"
              opacity={1}
              filter="brightness(.28)"
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
            onClick={() => navigate("/demo")}
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
      </div>
      <div className={styles["footer"]}>
        <p>©2024 Dopameter</p>
      </div>
    </>
  );
};

export default LandingPage;
