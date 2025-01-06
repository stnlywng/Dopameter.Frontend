import styles from "./LandingPage.module.css"; // Create a CSS file for styles
import { useEffect, useRef } from "react";
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

  const lottieRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lottieRef.current) {
      const svg = lottieRef.current.querySelector("svg");
      if (svg) {
        svg.style.width = "auto";
        svg.style.maxHeight = "100vh";
        // svg.style.minHeight = "100vh";
        // svg.style.minWidth = "100vw";
        svg.style.height = "auto";
        svg.style.transform = "translate(0, 0)";
      }
    }
  }, []);

  return (
    <>
      <div ref={lottieRef} className={styles["lottie-bg"]}>
        <Lottie animationData={backgroundAnimation} loop={true} />
      </div>
      <div className={styles["footer"]}>
        <p>©2024 Dopameter</p>
      </div>
    </>
  );
};

export default LandingPage;
