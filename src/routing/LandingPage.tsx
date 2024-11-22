import styles from "./LandingPage.module.css"; // Create a CSS file for styles
import { useEffect } from "react";
import axiosInstance from "../api/api-client";
import { CanceledError } from "axios";
import Lottie from "lottie-react";

import backgroundAnimation from "../assets/Home_Animation.json";

const LandingPage = () => {
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
      <Lottie animationData={backgroundAnimation} loop={true} />
      <div className={styles["footer"]}>
        <p>©2024 Dopameter</p>
      </div>
    </>
  );
};

export default LandingPage;
