import { Box, Button } from "@chakra-ui/react";
import { Gremlin } from "../../types/Gremlin";
import styles from "./GremlinInfoBox.module.css";

interface GremlinInfoBoxProps {
  currentGremlin: Gremlin;
  setIsEditGrem: (value: boolean) => void;
  setIsFeedGrem: (value: boolean) => void;
}

export const calculateGremlinWeight = (
  lastSetWeight: number,
  lastFedDate: Date | string
): number => {
  // Ensure lastFedDate is a Date object, even if it's a string
  const fedDate =
    typeof lastFedDate === "string" ? new Date(lastFedDate) : lastFedDate;

  // Get today's date
  const today = new Date();
  // Calculate the difference in time (milliseconds) and convert it to days
  const differenceInTime = today.getTime() - fedDate.getTime() - 1;

  const differenceInDays =
    Math.floor(differenceInTime / (1000 * 3600 * 24)) + 1;

  // Apply the formula: (lastSetWeight / 28) * differenceInDays
  const result = (lastSetWeight / 28) * (28 - differenceInDays);

  return result;
};

const GremlinInfoBox = ({
  currentGremlin,
  setIsEditGrem,
  setIsFeedGrem,
}: GremlinInfoBoxProps) => {
  return (
    <Box
      position="absolute"
      left={currentGremlin.pleasurePain <= 1 ? "100%" : undefined}
      right={currentGremlin.pleasurePain >= 2 ? "100%" : undefined}
      bottom="1px"
      backgroundColor="#303030"
      color="white"
      border="1px solid #ccc"
      padding="14px"
      paddingTop={"6px"}
      boxShadow="lg"
      borderRadius={20}
      textAlign="left"
      zIndex={10}
      minWidth={"240px"}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <h1
          className={styles.h1}
          style={{
            paddingTop: "10px",
            paddingRight: "14px",
            fontSize: "24px",
            textTransform: "uppercase",
            paddingBottom: "12px",
          }}
        >
          {currentGremlin.name}
        </h1>
        <Button
          borderColor="#93B1FF"
          borderWidth="2px"
          borderRadius={"8px"}
          color="#93B1FF"
          background={"transparent"}
          _hover={{
            backgroundColor: "#93B1FF",
            color: "black",
            borderColor: "white",
          }}
          size={"sm"}
          onClick={() => setIsEditGrem(true)}
        >
          Edit
        </Button>
      </div>
      <h3 style={{ fontSize: "14px", paddingBottom: "0px" }}>Activity</h3>
      <h1
        className={styles.h1}
        style={{
          paddingTop: "10px",
          paddingRight: "14px",
          fontSize: "24px",
          textTransform: "uppercase",
          paddingBottom: "12px",
        }}
      >
        {currentGremlin.activityName}
      </h1>
      <h3 style={{ fontSize: "14px", paddingBottom: "0px" }}>Intensity</h3>
      <h1
        className={styles.h1}
        style={{
          paddingTop: "10px",
          paddingRight: "14px",
          fontSize: "24px",
          textTransform: "uppercase",
          paddingBottom: "12px",
        }}
      >
        {currentGremlin.intensity}
      </h1>
      <h3 style={{ fontSize: "14px", paddingBottom: "0px" }}>
        Current Weight %
      </h3>
      <h1
        className={styles.h1}
        style={{
          paddingTop: "10px",
          paddingRight: "14px",
          fontSize: "24px",
          textTransform: "uppercase",
          paddingBottom: "12px",
        }}
      >
        {Math.round(
          calculateGremlinWeight(
            currentGremlin.lastSetWeight,
            currentGremlin.lastFedDate
          )
        )}
      </h1>
      <Button
        borderRadius={10}
        backgroundColor="#b3c8ff"
        onClick={() => setIsFeedGrem(true)}
        _hover={{
          backgroundColor: "#93B1FF",
        }}
        size={"md"}
        width={"100%"}
        height={"44px"}
      >
        Feed
      </Button>
    </Box>
  );
};

export default GremlinInfoBox;
