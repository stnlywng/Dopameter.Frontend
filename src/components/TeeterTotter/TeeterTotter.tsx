import { motion } from "framer-motion";
import styles from "./TeeterTotter.module.css";
import { Box, Image, Text } from "@chakra-ui/react";
import useGremlins from "../../hooks/useGremlins";
import goodPinkGremlin_1 from "/src/assets/goodgremlin/Pink.png";
import goodPinkGremlin_2 from "/src/assets/goodgremlin/Pink.png";
import goodPinkGremlin_3 from "/src/assets/goodgremlin/Pink.png";
import goodPinkGremlin_4 from "/src/assets/goodgremlin/Pink.png";
import goodPinkGremlin_5 from "/src/assets/goodgremlin/Pink.png";

import goodBlueGremlin_2 from "/src/assets/goodgremlin/Blue.png";
import goodBlueGremlin_3 from "/src/assets/goodgremlin/Blue.png";
import goodBlueGremlin_1 from "/src/assets/goodgremlin/Blue.png";
import goodBlueGremlin_4 from "/src/assets/goodgremlin/Blue.png";
import goodBlueGremlin_5 from "/src/assets/goodgremlin/Blue.png";

import goodOrangeGremlin_1 from "/src/assets/goodgremlin/Orange.png";
import goodOrangeGremlin_2 from "/src/assets/goodgremlin/Orange.png";
import goodOrangeGremlin_3 from "/src/assets/goodgremlin/Orange.png";
import goodOrangeGremlin_4 from "/src/assets/goodgremlin/Orange.png";
import goodOrangeGremlin_5 from "/src/assets/goodgremlin/Orange.png";

import badGreenGremlin_1 from "/src/assets/badgremlin/badGreenGremlin_1.png";
import badGreenGremlin_2 from "/src/assets/badgremlin/badGreenGremlin_2.png";
import badGreenGremlin_3 from "/src/assets/badgremlin/badGreenGremlin_3.png";
import badGreenGremlin_4 from "/src/assets/badgremlin/badGreenGremlin_4.png";
import badGreenGremlin_5 from "/src/assets/badgremlin/badGreenGremlin_5.png";

import badBlueGremlin_1 from "/src/assets/badgremlin/badBlueGremlin_1.png";
import badBlueGremlin_2 from "/src/assets/badgremlin/badBlueGremlin_2.png";
import badBlueGremlin_3 from "/src/assets/badgremlin/badBlueGremlin_3.png";
import badBlueGremlin_4 from "/src/assets/badgremlin/badBlueGremlin_4.png";
import badBlueGremlin_5 from "/src/assets/badgremlin/badBlueGremlin_5.png";

import badOrangeGremlin_1 from "/src/assets/badgremlin/badOrangeGremlin_1.png";
import badOrangeGremlin_2 from "/src/assets/badgremlin/badOrangeGremlin_2.png";
import badOrangeGremlin_3 from "/src/assets/badgremlin/badOrangeGremlin_3.png";
import badOrangeGremlin_4 from "/src/assets/badgremlin/badOrangeGremlin_4.png";
import badOrangeGremlin_5 from "/src/assets/badgremlin/badOrangeGremlin_5.png";

import defaultGremlin from "/src/assets/goodgremlin/Pink.png"; // Default image

import { useState } from "react";
import EditGremlinModal from "../EditGremlinModal/EditGremlinModal";
import CreateGremlinModal from "../CreateGremlinModal/CreateGremlinModal";

const imageMapping: { [style: number]: { [fatness: number]: string } } = {
  4: {
    // Good Pink Gremlin
    1: goodPinkGremlin_1,
    2: goodPinkGremlin_2,
    3: goodPinkGremlin_3,
    4: goodPinkGremlin_4,
    5: goodPinkGremlin_5,
  },
  5: {
    // Good Blue Gremlin
    1: goodBlueGremlin_1,
    2: goodBlueGremlin_2,
    3: goodBlueGremlin_3,
    4: goodBlueGremlin_4,
    5: goodBlueGremlin_5,
  },
  6: {
    // Good Orange Gremlin
    1: goodOrangeGremlin_1,
    2: goodOrangeGremlin_2,
    3: goodOrangeGremlin_3,
    4: goodOrangeGremlin_4,
    5: goodOrangeGremlin_5,
  },
  2: {
    // Bad Green Gremlin
    1: badGreenGremlin_1,
    2: badGreenGremlin_2,
    3: badGreenGremlin_3,
    4: badGreenGremlin_4,
    5: badGreenGremlin_5,
  },
  1: {
    // Bad Blue Gremlin
    1: badBlueGremlin_1,
    2: badBlueGremlin_2,
    3: badBlueGremlin_3,
    4: badBlueGremlin_4,
    5: badBlueGremlin_5,
  },
  3: {
    // Bad Orange Gremlin
    1: badOrangeGremlin_1,
    2: badOrangeGremlin_2,
    3: badOrangeGremlin_3,
    4: badOrangeGremlin_4,
    5: badOrangeGremlin_5,
  },
};

const getGremlinImage = (style: number, fatness: number) => {
  const fatnessLevel = Math.ceil(fatness / 200); // Determine the fatness level
  return imageMapping[style]?.[fatnessLevel] || defaultGremlin; // Fallback to default image
};

interface TeeterTotterProps {
  isCreateGrem: boolean;
  setIsCreateGrem: (value: boolean) => void;
}

const TeeterTotter: React.FC<TeeterTotterProps> = ({
  isCreateGrem,
  setIsCreateGrem,
}) => {
  const [tilt, setTilt] = useState(0);
  const { gremlins, error, isLoading, setGremlins, setError, updateGremlins } =
    useGremlins();
  const [hoveredGremlin, setHoveredGremlin] = useState<number>(-1);
  const [isEditGrem, setIsEditGrem] = useState(false);

  var goodGremPosCount = 0;
  var badGremPosCount = 0;

  const calculateHeight = (intensity: number) => {
    const calculatedValue =
      ((intensity / 1000) * 65 + 35) / (13 * (gremlins.length / 9));
    return calculatedValue > 12 ? "12vw" : `${calculatedValue}vw`;
  };

  return (
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
          boxSize="100%"
          objectFit="cover"
          src="/src/assets/log.png"
          alt="Log Background"
          objectPosition="bottom"
        />
      </div>
      <motion.div
        className={styles["teeter-totter"]}
        style={{
          transformOrigin: "bottom",
          height: "180px",
          willChange: "transform",
        }}
        animate={{ rotate: tilt, scale: 1 }}
        transition={{ type: "spring", stiffness: 50 }}
        onMouseEnter={() => {
          setTilt(0);
        }}
        onMouseLeave={() => {
          setTilt(-8);
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
        {gremlins.map((currentGremlin, index) => (
          <div
            key={currentGremlin.gremlinID} // Ensure a unique key
            className={styles["gremlin"]}
            style={{
              left:
                currentGremlin.kindOfGremlin < 4
                  ? `${
                      (badGremPosCount++ * ((7.5 / gremlins.length) * 140)) / 22
                    }vw`
                  : undefined,
              right:
                currentGremlin.kindOfGremlin >= 4
                  ? `${
                      (goodGremPosCount++ * ((7.5 / gremlins.length) * 140)) /
                      22
                    }vw`
                  : undefined,
              height: calculateHeight(currentGremlin.intensity),
            }}
            onMouseEnter={() => setHoveredGremlin(currentGremlin.gremlinID)} // Track gremlin on hover
            onMouseLeave={() => {
              if (!isEditGrem) {
                setHoveredGremlin(-1);
              }
            }}
            onMouseDown={() => setIsEditGrem(true)}
          >
            <Image
              boxSize="100%"
              objectFit="cover"
              src={getGremlinImage(
                currentGremlin.kindOfGremlin,
                currentGremlin.intensity
              )}
              alt={currentGremlin.name}
              objectPosition="bottom"
              style={{
                transform:
                  currentGremlin.kindOfGremlin < 4 ? "scaleX(-1)" : undefined,
              }}
            />

            {/* {hoveredGremlin === currentGremlin.gremlinID && (
              <div style={{ position: "relative", bottom: "100%" }}>
                <Text position="relative" bottom="30px" fontSize="xl">
                  {currentGremlin.name}
                </Text>
              </div>
            )} */}

            {/* Show the details square if this gremlin is being hovered */}
            {hoveredGremlin === currentGremlin.gremlinID && (
              <Box
                position="absolute"
                left={
                  currentGremlin.kindOfGremlin < 4
                    ? `${(currentGremlin.intensity / 1000) * 110 + 75}px`
                    : undefined
                }
                right={
                  currentGremlin.kindOfGremlin >= 4
                    ? `${(currentGremlin.intensity / 1000) * 110 + 75}px`
                    : undefined
                }
                bottom="1px"
                backgroundColor="black" // Set background to black
                color="white" // Set text color to white
                border="1px solid #ccc"
                padding="10px"
                boxShadow="lg"
                borderRadius={5}
                textAlign="left" // Ensure text is left-aligned
                zIndex={10} // Ensure it appears above other content
                minWidth={180}
              >
                <p>Name: {currentGremlin.name}</p>
                <p>Activity: {currentGremlin.activityName}</p>
                <p>Intensity: {currentGremlin.intensity}</p>
              </Box>
            )}
          </div>
        ))}
      </motion.div>
      {isEditGrem && (
        <EditGremlinModal
          isEditGrem={isEditGrem}
          gremlinID={hoveredGremlin}
          setIsEditGrem={setIsEditGrem}
          resetHoveredGremlin={() => {
            setHoveredGremlin(-1);
            updateGremlins();
          }}
        />
      )}
      {isCreateGrem && (
        <CreateGremlinModal
          isCreateGrem={isCreateGrem}
          setIsCreateGrem={setIsCreateGrem}
          updateGremlins={updateGremlins}
        />
      )}
    </div>
  );
};

export default TeeterTotter;
