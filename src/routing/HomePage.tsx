import { useState } from "react";
import TeeterTotter from "../components/TeeterTotter/TeeterTotter";
import styles from "./HomePage.module.css";
import { Button, Image } from "@chakra-ui/react";

const HomePage = () => {
  const [isCreateGrem, setIsCreateGrem] = useState(false);

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
        <TeeterTotter
          isCreateGrem={isCreateGrem}
          setIsCreateGrem={setIsCreateGrem}
        />
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

export default HomePage;
