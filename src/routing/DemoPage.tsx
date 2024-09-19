import { useEffect, useState } from "react";
import styles from "./DemoPage.module.css";
import { Button, Image } from "@chakra-ui/react";
import { CanceledError } from "axios";
import axiosInstance from "../api/api-client";
import { AuthResponse } from "../components/LoginSignupModal/LoginSighupModal";
import TeeterTotter from "../components/TeeterTotter/TeeterTotter";
import useGremlins from "../hooks/useGremlins";
import EmptyTeeterTotter from "../components/EmptyTotter/EmptyTeeterTotter";

const DemoPage = () => {
  const [isCreateGrem, setIsCreateGrem] = useState(false);
  const [isLoadingLogin, setIsLoadingLogin] = useState(true); // Add loading state
  const { updateGremlins } = useGremlins();

  useEffect(() => {
    const controller = new AbortController();

    axiosInstance
      .post<AuthResponse>("/login/demo", { signal: controller.signal })
      .then((response) => {
        const { token, username, email } = response.data;

        // Store the token and userId in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("userID", "-5");
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);

        // Call updateGremlins after successful login
        updateGremlins();

        // Login complete, stop loading
        setIsLoadingLogin(false);

        console.log("Demo Sign In successful:", response.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.error("Sign Up error:", err.message);
        setIsLoadingLogin(false); // Stop loading even if error occurs
      });

    return () => controller.abort();
  }, []);

  return (
    <div className={styles["home-container"]}>
      <div className={styles["background-animation"]}>
        <Image
          boxSize="100%"
          objectFit="cover"
          src="/src/assets/sky.png"
          alt="Log Background"
          objectPosition="bottom"
          filter="brightness(1) opacity(.5)"
        />
      </div>
      <div className={styles["content"]}>
        {isLoadingLogin ? (
          <EmptyTeeterTotter />
        ) : (
          <TeeterTotter
            isCreateGrem={isCreateGrem}
            setIsCreateGrem={setIsCreateGrem}
          />
        )}
      </div>
      <div className={styles["add-gremlin-button"]}>
        <Button
          borderColor={"white"}
          color={"white"}
          borderRadius={6}
          borderWidth={4}
          padding={0}
          fontSize={50}
          height={20}
          width={20}
          background={"rgba(255, 255, 255, 0.1)"}
          size={"lg"}
          _hover={{
            backgroundColor: "#fafafa",
            color: "black",
            borderColor: "black",
          }}
          _active={{
            borderColor: "white",
            borderWidth: 4,
          }}
          onClick={() => setIsCreateGrem(true)}
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default DemoPage;
