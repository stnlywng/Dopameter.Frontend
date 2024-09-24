import { useState } from "react";
import styles from "./InfoPage.module.css";
import { Button, Circle, Flex, Image, Text } from "@chakra-ui/react";
import Lottie from "lottie-react";
// import animationData from "../assets/B_Blue.json";
import animationData1 from "../assets/G_Pink.json";

// Define a type for the step data
type Step = {
  image: string;
  title: string;
  content: string;
};

// Steps data array
const steps: Step[] = [
  {
    image: "/src/assets/ice_pic.webp",
    title: "Step 1 - The Pleasure-Pain Balance",
    content:
      "Neuroscience has discovered that the same part of the brain processes both pleasure and pain like two sides of a seesaw (pleasure and pain work like opposite sides of a balance). When we do something pleasurable (which releases dopamine), it tips the balance toward pleasure. On the other hand, effortful or difficult activities shift it toward pain.",
  },
  {
    image: "/src/assets/ice_mood.jpg",
    title: "Step 2 - Leveling the Balance",
    content:
      "The brain always tries to keep the balance level, a state called homeostasis. It does this by creating mental “gremlins” that add weight to the opposite side of the balance. The stronger the experience (whether pleasure or pain), the more gremlins are created to balance things out.",
  },
  {
    image: "/src/assets/ice_spice.jpeg",
    title: "Step 3 - Addiction",
    content:
      "The problem arises when we overindulge in intense pleasures like drugs, porn, or social media. This pushes the pleasure side down hard, causing too many gremlins to appear. Once the pleasure fades, the gremlins remain, tipping the balance toward pain (as we are no longer participating in the experience which intensely pressed on the pleasure side of the balance). This leaves a person feeling low and craving more pleasure, potentially leading to a cycle of addiction.",
  },
  {
    image: "/src/assets/ice_tng.jpeg",
    title: "Step 4 - Recovery",
    content:
      "Recovery focuses on starving the gremlins by avoiding the addictive behavior. This helps restore balance and homeostasis. It typically takes about four weeks for gremlins to fade away and for the balance to return to normal.",
  },
  {
    image: "/src/assets/ice_amur.jpg",
    title: "Step 5 - Dopameter",
    content:
      'Dopameter is a web app designed to help you visualize and track your mental balance by managing "gremlins," which represent both healthy and unhealthy activities that impact your pleasure-pain balance. Each gremlin affects your mental state, contributing either to the pleasure or pain side of the balance. By keeping track of your gremlins, Dopameter helps you understand how your habits influence your overall well-being, providing a clear picture of why you feel the way you do. You can see the effects of both healthy, balanced actions and the lingering impact of overstimulation, and make informed decisions about how to restore equilibrium.',
  },
  {
    image: "/src/assets/ice_wings.webp",
    title: "Step 6 - Gremlins",
    content:
      'Gremlins are created based on your activities—whether they\'re healthy and graceful pleasure-pain experiences, or potentially harmful and overly-intense pleasure-pain experiences. Each gremlin has two key attributes: intensity and weight. Intensity reflects how strong the experience was, while weight determines how much it currently impacts your balance. Over time, a gremlin’s weight decreases as long as you don’t "feed" it, meaning you don’t engage in the associated activity. If you do feed a specific gremlin once again, you will have the option to feed it once more! After four weeks of no activity, the gremlin’s weight drops to zero, no longer affecting your balance.',
  },
];

const InfoPage = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  // Handler to go to the next step
  const handleNext = (): void => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      setActiveStep(0);
    }
  };

  // Handler to set active step when clicking on a dot
  const handleDotClick = (index: number): void => {
    setActiveStep(index);
  };

  return (
    <>
      <div className={styles["info-page"]}>
        <div className={styles["background-animation"]}>
          {
            <Image
              boxSize="100%"
              objectFit="cover"
              src="/src/assets/info_sky.jpg"
              alt="Sky"
              opacity={1}
              objectPosition="center"
            />
          }
        </div>
        <div className={styles["banner-content"]}>
          <div />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <h1 style={{ fontSize: "80px" }}>How it Works</h1>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "10px",
              paddingRight: "0px",
            }}
          >
            <Image
              boxSize="85%"
              objectFit="cover"
              src="/src/assets/Info_GoodGrem.png"
              alt="Sky"
              opacity={1}
            />
          </div>
        </div>
        <div
          className={styles["info-content"]}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className={styles["info-content-main"]}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <Image
              boxSize="30%"
              objectFit="contain"
              src={steps[activeStep].image}
              alt="Sky"
              height={400}
              opacity={1}
            /> */}
            {/* <Box boxSize="30%" objectFit="contain" height={400}>
              <Lottie animationData={animationData} loop={true} />
            </Box> */}
            <Lottie
              animationData={animationData1}
              loop={true}
              size={400}
              style={{
                width: "400px",
                height: "400px",
                transform: "scaleX(-1)",
              }}
            />
            <div className={styles["info-content-text"]}>
              <Text
                fontSize="2.3vw"
                fontWeight="bold"
                mb={3}
                color={"black"}
                textAlign={"left"}
              >
                {steps[activeStep].title}
              </Text>
              <Text
                fontSize="1.2vw"
                color={"black"}
                textAlign={"left"}
                whiteSpace="pre-line"
              >
                {steps[activeStep].content}
              </Text>
            </div>
          </div>

          {/* Pagination Dots */}
          <Flex mt={5} mb={5} justify="center" align="center">
            {steps.map((_, index) => (
              <Circle
                key={index}
                size="12px"
                bg={activeStep === index ? "blue.500" : "gray.300"}
                mx={1}
                cursor="pointer"
                onClick={() => handleDotClick(index)}
              />
            ))}
          </Flex>

          <Button
            colorScheme="twitter"
            borderRadius={12}
            borderWidth={2}
            onClick={() => handleNext()}
            size={"lg"}
            width={188}
          >
            Next
          </Button>
        </div>
      </div>

      <div className={styles["footer"]}>
        <p>©2024 Dopameter</p>
      </div>
    </>
  );
};

export default InfoPage;
