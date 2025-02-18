import { motion } from "framer-motion";
import styles from "./TeeterTotter.module.css";
import { Image, Text } from "@chakra-ui/react";
import useGremlins from "../../hooks/useGremlins";
import goodPinkGremlin_1 from "/src/assets/goodgremlin/goodPinkGremlin_1.png";
import goodPinkGremlin_2 from "/src/assets/goodgremlin/goodPinkGremlin_2.png";
import goodPinkGremlin_3 from "/src/assets/goodgremlin/goodPinkGremlin_3.png";
import goodPinkGremlin_4 from "/src/assets/goodgremlin/goodPinkGremlin_4.png";
import goodPinkGremlin_5 from "/src/assets/goodgremlin/goodPinkGremlin_5.png";

import goodBlueGremlin_1 from "/src/assets/goodgremlin/goodBlueGremlin_1.png";
import goodBlueGremlin_2 from "/src/assets/goodgremlin/goodBlueGremlin_2.png";
import goodBlueGremlin_3 from "/src/assets/goodgremlin/goodBlueGremlin_3.png";
import goodBlueGremlin_4 from "/src/assets/goodgremlin/goodBlueGremlin_4.png";
import goodBlueGremlin_5 from "/src/assets/goodgremlin/goodBlueGremlin_5.png";

import goodOrangeGremlin_1 from "/src/assets/goodgremlin/goodOrangeGremlin_1.png";
import goodOrangeGremlin_2 from "/src/assets/goodgremlin/goodOrangeGremlin_2.png";
import goodOrangeGremlin_3 from "/src/assets/goodgremlin/goodOrangeGremlin_3.png";
import goodOrangeGremlin_4 from "/src/assets/goodgremlin/goodOrangeGremlin_4.png";
import goodOrangeGremlin_5 from "/src/assets/goodgremlin/goodOrangeGremlin_5.png";

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

import { useEffect, useState } from "react";
import EditGremlinModal from "../EditGremlinModal/EditGremlinModal";
import CreateGremlinModal from "../CreateGremlinModal/CreateGremlinModal";
import GremlinInfoBox, {
  calculateGremlinWeight,
} from "../GremlinInfoBox/GremlinInfoBox";
import FeedModal from "../FeedModal/FeedModal";
import DeleteModal from "../DeleteGremlinModal/DeleteModal";

// import Lottie from "lottie-react";
// import animationData from "../../assets/B_Blue.json";

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

const calculateTilt = (
  goodGremWeight: number,
  badGremWeight: number,
  leftOrRight: number
) => {
  const maxTilt = 11.8;
  return leftOrRight > 0
    ? leftOrRight *
        maxTilt *
        (goodGremWeight / (goodGremWeight + badGremWeight))
    : leftOrRight *
        maxTilt *
        (badGremWeight / (goodGremWeight + badGremWeight));
};

interface TeeterTotterProps {
  isCreateGrem: boolean;
  setIsCreateGrem: (value: boolean) => void;
}

const TeeterTotter: React.FC<TeeterTotterProps> = ({
  isCreateGrem,
  setIsCreateGrem,
}) => {
  const [tilt, setTilt] = useState<number>(0);
  const { gremlins, updateGremlins } = useGremlins();
  const [hoveredGremlin, setHoveredGremlin] = useState<number>(-1);
  const [hoveredGremlinName, setHoveredGremlinName] = useState<string>("");
  const [isEditGrem, setIsEditGrem] = useState(false);
  const [isFeedGrem, setIsFeedGrem] = useState(false);
  const [isDelGrem, setIsDelGrem] = useState(false);
  const [maxOfGremTypes, setMaxOfGremTypes] = useState(0);

  const [goodGremsTotalWeight, setGoodGremsTotalWeight] = useState(0);
  const [badGremsTotalWeight, setBadGremsTotalWeight] = useState(0);

  useEffect(() => {
    if (gremlins.length === 0) return; // Only calculate if gremlins exist

    let totalGoodWeight = 0;
    let totalBadWeight = 0;
    let goodGremsCount = 0;
    let badGremsCount = 0;

    gremlins.forEach((gremlin) => {
      let weight =
        calculateGremlinWeight(gremlin.lastSetWeight, gremlin.lastFedDate) *
        0.01;
      weight *= gremlin.intensity;

      if (gremlin.pleasurePain == 1) {
        badGremsCount++;
        totalBadWeight += weight;
      } else {
        goodGremsCount++;
        totalGoodWeight += weight;
      }
    });

    setMaxOfGremTypes(Math.max(goodGremsCount, badGremsCount));
    setGoodGremsTotalWeight(totalGoodWeight);
    setBadGremsTotalWeight(totalBadWeight);

    // Calculate tilt only after weights are fully set
    if (totalGoodWeight + totalBadWeight > 0) {
      const newTilt =
        totalGoodWeight >= totalBadWeight
          ? calculateTilt(totalGoodWeight, totalBadWeight, 1)
          : calculateTilt(totalGoodWeight, totalBadWeight, -1);

      setTilt(newTilt);
    }
  }, [gremlins, setGoodGremsTotalWeight, setBadGremsTotalWeight]);

  var goodGremPosCount = 0;
  var badGremPosCount = 0;

  const calculateHeight = (intensity: number) => {
    const calculatedValue =
      ((intensity / 1000) * 65 + 35) / (13 * (maxOfGremTypes / 7));
    return calculatedValue > 12 ? "12vw" : `${calculatedValue}vw`;
  };

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
          onMouseLeave={() => {
            if (goodGremsTotalWeight >= badGremsTotalWeight) {
              setTilt(
                calculateTilt(goodGremsTotalWeight, badGremsTotalWeight, 1)
              );
            } else {
              setTilt(
                calculateTilt(goodGremsTotalWeight, badGremsTotalWeight, -1)
              );
            }
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
                  currentGremlin.pleasurePain <= 1
                    ? `${
                        (badGremPosCount++ * ((5.2 / maxOfGremTypes) * 140)) /
                        22
                      }vw`
                    : undefined,
                right:
                  currentGremlin.pleasurePain >= 2
                    ? `${
                        (goodGremPosCount++ * ((5.4 / maxOfGremTypes) * 140)) /
                        22
                      }vw`
                    : undefined,
                height:
                  currentGremlin.kindOfGremlin < 4
                    ? calculateHeight(currentGremlin.intensity / 3.1)
                    : calculateHeight(currentGremlin.intensity),
                cursor: "pointer",
                zIndex: 1000 - index,
              }}
              onMouseEnter={() => {
                setHoveredGremlin(currentGremlin.gremlinID);
                setHoveredGremlinName(currentGremlin.name);
                setTilt(0);
              }}
              onMouseLeave={() => {
                if (!isEditGrem && !isFeedGrem && !isDelGrem) {
                  setHoveredGremlin(-1);
                }
                if (goodGremsTotalWeight >= badGremsTotalWeight) {
                  setTilt(
                    calculateTilt(goodGremsTotalWeight, badGremsTotalWeight, 1)
                  );
                } else {
                  setTilt(
                    calculateTilt(goodGremsTotalWeight, badGremsTotalWeight, -1)
                  );
                }
              }}
            >
              <Image
                boxSize="100%"
                src={getGremlinImage(
                  currentGremlin.kindOfGremlin,
                  Math.round(
                    calculateGremlinWeight(
                      currentGremlin.lastSetWeight,
                      currentGremlin.lastFedDate
                    )
                  ) * 10
                )}
                alt={currentGremlin.name}
                style={{
                  transform:
                    currentGremlin.pleasurePain <= 1 ? "scaleX(-1)" : undefined,
                }}
              />
              {/* <Lottie
                animationData={animationData}
                loop={true}
                size={400}
                style={{
                  width: "100%",
                  height: "100%",
                  transform:
                    currentGremlin.pleasurePain <= 1 ? "scaleX(-1)" : undefined,
                }}
              /> */}
              {/* Bad Gremlin Name Tag */}
              {hoveredGremlin === currentGremlin.gremlinID &&
                currentGremlin.pleasurePain <= 1 && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "115%", // Adjusted for vertical centering
                      left: "52%",
                      transform: "translate(-47%, 53%)", // Centers horizontally and moves the div based on its dimensions
                      textAlign: "center", // Center the text within the div
                    }}
                  >
                    <Text
                      fontSize="xl"
                      color="white"
                      textShadow="
                            -1px -1px 0 black,  /* Top-left shadow */
                            1px -1px 0 black,   /* Top-right shadow */
                            -1px 1px 0 black,   /* Bottom-left shadow */
                            1px 1px 0 black     /* Bottom-right shadow */
                        "
                    >
                      {currentGremlin.name}
                    </Text>
                  </div>
                )}
              {/* Good Gremlin Name Tag */}
              {hoveredGremlin === currentGremlin.gremlinID &&
                currentGremlin.pleasurePain >= 2 && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "112%", // Adjusted for vertical centering
                      left: "39.3%",
                      transform: "translate(-45%, 55%)", // Centers horizontally and moves the div based on its dimensions
                      textAlign: "center", // Center the text within the div
                    }}
                  >
                    <Text
                      fontSize="xl"
                      color="white"
                      textShadow="
                            -1px -1px 0 black,  /* Top-left shadow */
                            1px -1px 0 black,   /* Top-right shadow */
                            -1px 1px 0 black,   /* Bottom-left shadow */
                            1px 1px 0 black     /* Bottom-right shadow */
                        "
                    >
                      {currentGremlin.name}
                    </Text>
                  </div>
                )}
              {/* Info Box */}
              {hoveredGremlin === currentGremlin.gremlinID && (
                <GremlinInfoBox
                  currentGremlin={currentGremlin}
                  setIsEditGrem={setIsEditGrem}
                  setIsFeedGrem={setIsFeedGrem}
                  setIsDelGrem={setIsDelGrem}
                />
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
        {isFeedGrem && (
          <FeedModal
            isFeedGrem={isFeedGrem}
            gremlinID={hoveredGremlin}
            setIsFeedGrem={setIsFeedGrem}
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
        {isDelGrem && (
          <DeleteModal
            isDelGremlin={isDelGrem}
            gremlinID={hoveredGremlin}
            gremlinStyle={3}
            gremlinName={hoveredGremlinName}
            setIsDelGremlin={setIsDelGrem}
            resetHoveredGremlin={() => {
              setHoveredGremlin(-1);
              updateGremlins();
            }}
          />
        )}
      </div>
      <div
        className={styles["hoverbox"]}
        onMouseEnter={() => {
          setTilt(0);
        }}
        onMouseLeave={() => {
          if (goodGremsTotalWeight >= badGremsTotalWeight) {
            setTilt(
              calculateTilt(goodGremsTotalWeight, badGremsTotalWeight, 1)
            );
          } else {
            setTilt(
              calculateTilt(goodGremsTotalWeight, badGremsTotalWeight, -1)
            );
          }
        }}
      ></div>
    </>
  );
};

export default TeeterTotter;
