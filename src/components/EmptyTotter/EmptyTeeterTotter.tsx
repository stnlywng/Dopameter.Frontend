import { motion } from "framer-motion";
import styles from "./EmptyTeeterTotter.module.css";
import { Image } from "@chakra-ui/react";
import { useState } from "react";

const EmptyTeeterTotter = () => {
  const [tilt, setTilt] = useState<number>(0);

  return (
    <>
      <div className={styles["teeter-totter-container"]}>
        <div className={styles["ground"]}>
          <Image
            boxSize="100%"
            objectFit="cover"
            src="/src/assets/ground.jpg"
            alt="Log Background"
            objectPosition="bottom"
          />
        </div>
        <div className={styles["log"]}>
          <Image
            boxSize="140%"
            objectFit="cover"
            src="/src/assets/log.png"
            alt="Log Background"
            objectPosition="bottom"
          />
        </div>
        <h3>Loading . . .</h3>
        <motion.div
          className={styles["teeter-totter"]}
          style={{
            transformOrigin: "bottom",
            height: "180px",
            willChange: "transform",
          }}
          animate={{ rotate: tilt, scale: 1 }}
          transition={{ type: "spring", stiffness: 30 }}
          onMouseEnter={() => {
            setTilt(0);
          }}
        >
          <div
            style={{
              width: "100%",
              height: "14px",
              backgroundColor: "#555",
              alignContent: "center",
              position: "absolute",
              bottom: "0",
              display: "flex",
              justifyContent: "space-between",
              borderRadius: "10px",
            }}
          ></div>
        </motion.div>
      </div>
    </>
  );
};

export default EmptyTeeterTotter;
