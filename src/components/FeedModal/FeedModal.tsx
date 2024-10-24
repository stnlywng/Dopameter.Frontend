import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Tooltip,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axiosInstance from "../../api/api-client";
import useGremlins from "../../hooks/useGremlins";
import { CanceledError } from "axios";
import Lottie from "lottie-react";
import eatingAnimationBad from "../../assets/B_Blue_Eating.json";
import eatingAnimationGood from "../../assets/G_Pink_Eating.json";
import GremlinService from "../../api/gremlinService";

const feedGremlinSchema = z.object({
  percentFed: z.number().min(1).max(100).default(50),
});

type FeedGremlinData = z.infer<typeof feedGremlinSchema>;

interface FeedModalProps {
  isFeedGrem: boolean;
  gremlinID: number;
  setIsFeedGrem: (value: boolean) => void;
  resetHoveredGremlin: () => void;
}

const FeedModal = ({
  isFeedGrem,
  gremlinID,
  setIsFeedGrem,
  resetHoveredGremlin,
}: FeedModalProps) => {
  const [sliderValue, setSliderValue] = useState(50);
  const [showTooltip, setShowTooltip] = React.useState(false);
  const { updateGremlins } = useGremlins();
  const [gremlinType, setGremlinType] = useState(1);

  const { handleSubmit: handleFeedSubmit, setValue } = useForm<FeedGremlinData>(
    {
      resolver: zodResolver(feedGremlinSchema),
      mode: "onChange",
    }
  );

  // get gremlin style
  useEffect(() => {
    const { request, cancel } = GremlinService.getGremlinById(gremlinID);

    request
      .then((res) => {
        setGremlinType(res.data.kindOfGremlin);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
      });

    return () => cancel();
  }, []);

  const handleFeed = (data: FeedGremlinData) => {
    console.log("Gremlin Fed:", data);

    const controller = new AbortController();
    const { percentFed } = data;

    axiosInstance
      .post(
        "/gremlin/feed",
        { gremlinID, percentFed },
        { signal: controller.signal }
      )
      .then((response) => {
        setIsFeedGrem(false);
        resetHoveredGremlin();
        updateGremlins();
        console.log("Gremlin fed successful:", response.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.error("Gremlin feed error:", err.message);
      });

    return () => controller.abort();
  };

  return (
    <Modal isOpen={isFeedGrem} onClose={() => setIsFeedGrem(false)}>
      <ModalOverlay opacity={90} />
      <ModalContent bg="#333" width={"550px"} maxW={"550px"} padding={45}>
        <ModalCloseButton color="white" />
        <Center>
          <Lottie
            animationData={
              gremlinType < 4 ? eatingAnimationBad : eatingAnimationGood
            }
            loop={true}
            style={{
              width: "230px",
              height: gremlinType < 4 ? "160px" : "200px",
              transform: "scaleX(1)",
            }}
          />
        </Center>
        <form onSubmit={handleFeedSubmit(handleFeed)}>
          <FormControl mt={4}>
            <FormLabel color="white">Feed Percentage %</FormLabel>
            <div style={{ paddingLeft: "8px", paddingRight: "8px" }}>
              <Slider
                aria-label="slider-ex-6"
                min={5}
                max={100}
                step={5}
                value={sliderValue}
                onChange={(val) => {
                  setSliderValue(val);
                  setValue("percentFed", val);
                }}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <Tooltip
                  hasArrow
                  bg="blue.500"
                  color="white"
                  placement="top"
                  isOpen={showTooltip}
                  label={`${sliderValue}%`}
                >
                  <SliderThumb />
                </Tooltip>
              </Slider>
            </div>
          </FormControl>
          <Button
            colorScheme="blue"
            width="100%"
            mx="auto"
            mt={7}
            type="submit"
          >
            Confirm Edit
          </Button>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default FeedModal;
