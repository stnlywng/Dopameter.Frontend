import { useState } from "react";
import styles from "./InfoPage.module.css";
import { Button, Circle, Flex, Image, Text } from "@chakra-ui/react";

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
      "One of the most exciting discoveries in modern neuroscience is the fact that it's that the same part of our brain that processes pleasure also happens to process pain. They are co-located and work like opposite sides of a balance—we picture this as a teeter-totter with one side for pleasure and one for pain. When we do something that is pleasurable (releases dopamine), we push down on the pleasure side of our mental balance. And then likewise, when we do something effortful, enduring, or difficult, we add weight to the pain side of the balance.",
  },
  {
    image: "/src/assets/ice_mood.jpg",
    title: "Step 2 - Leveling the Balance",
    content:
      'Our pleasure-pain balance earnestly desires to be levelled to reach a state called homeostasis, and it does so by creating and applying "gremlins" to the opposite side of our balance as we undergo experiences. The more intense the experience (whether it be on the pleasure or struggle/pain side), the more gremlins are created and hop on the opposite side of the balance to stay levelled.',
  },
  {
    image: "/src/assets/ice_spice.jpeg",
    title: "Step 3 - Addiction",
    content:
      'The issue occurs when we have intense and overly-stimulating experiences such as indulging in things like drugs, porn, social media, etc. We push on the pleasure side too hard and too sporadically, consequently calling the production of a heavy gremlin to try to level things out in the moment. But once the experience is over, the newly created gremlins remain and in effect tip the balance the opposing way as a new "resting" state. This will make the person feel sad and low (as they are mentally tilted towards the pain side), and then consequently hold a craving to intensely push down on the pleasure side of the balance one more (potentially leading to a spiral of addiction that only worsens).',
  },
  {
    image: "/src/assets/ice_tng.jpeg",
    title: "Step 4 - Recovery",
    content:
      "The main focus of recovery is to starve the gremlins (not feed into them), and from that restore homeostasis. This will look like abstaining from one's drug of choice, and looking to healthier and more balanced forms of dopamine. It usually takes 4 weeks for a gremlin to eventually dissipate.",
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
            <Image
              boxSize="30%"
              objectFit="contain"
              src={steps[activeStep].image}
              alt="Sky"
              height={400}
              opacity={1}
            />
            <div className={styles["info-content-text"]}>
              <Text
                fontSize="4xl"
                fontWeight="bold"
                mb={3}
                color={"black"}
                textAlign={"left"}
              >
                {steps[activeStep].title}
              </Text>
              <Text
                fontSize="xl"
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
