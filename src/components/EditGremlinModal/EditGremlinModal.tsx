import {
  Center,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  Image,
  FormControl,
  FormLabel,
  Input,
  Button,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Tooltip,
  Box,
  Checkbox,
} from "@chakra-ui/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import gremlinStyle1 from "/src/assets/badgremlin/BlueGremlinFront.png";
import gremlinStyle2 from "/src/assets/badgremlin/GreenGremlinFront.png";
import gremlinStyle3 from "/src/assets/badgremlin/OrangeGremlinFront.png";
import gremlinStyle4 from "/src/assets/goodgremlin/Pink.png";
import gremlinStyle5 from "/src/assets/goodgremlin/Blue.png";
import gremlinStyle6 from "/src/assets/goodgremlin/Orange.png";
import axiosInstance from "../../api/api-client";
import { CanceledError } from "axios";
import GremlinService from "../../api/gremlinService";
import useGremlins from "../../hooks/useGremlins";

const editGremlinSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).default(""),
  kindOfGremlin: z.number().default(1),
  activityName: z.string().min(1, { message: "Name is required" }).default(""),
  intensity: z.number().min(1).max(1000).default(50),
});

type EditGremlinData = z.infer<typeof editGremlinSchema>;

interface EditGremlinModalProps {
  isEditGrem: boolean;
  gremlinID: number;
  setIsEditGrem: (value: boolean) => void;
  resetHoveredGremlin: () => void;
}

const EditGremlinModal = ({
  isEditGrem,
  gremlinID,
  setIsEditGrem,
  resetHoveredGremlin,
}: EditGremlinModalProps) => {
  const [sliderValue, setSliderValue] = useState(50);
  const [showTooltip, setShowTooltip] = React.useState(false);
  const [useGremlinNameAsActivity, setUseGremlinNameAsActivity] =
    useState(false);

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [mode, setMode] = useState<"pleasure" | "pain">("pleasure"); // Mode toggle
  const [selectedStyle, setSelectedStyle] = useState(1); // Style toggle
  const { updateGremlins } = useGremlins();

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = GremlinService.getGremlinById(gremlinID);

    request
      .then((res) => {
        console.log("ran the getgrembyid with ID: " + gremlinID);
        setValue("name", res.data.name);
        setValue("activityName", res.data.activityName);
        setValue("intensity", res.data.intensity);
        setSliderValue(res.data.intensity);
        setValue("kindOfGremlin", res.data.kindOfGremlin);
        setSelectedStyle(res.data.kindOfGremlin);
        if (res.data.kindOfGremlin < 4) {
          setMode("pleasure");
        } else {
          setMode("pain");
        }
        if (res.data.activityName === res.data.name) {
          setUseGremlinNameAsActivity(true);
        }
        trigger("name");
        trigger("activityName");
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => cancel();
  }, []);

  const {
    register: gremlinRegister,
    handleSubmit: handleGremlinSubmit,
    formState: { errors: gremlinErrors, isValid: isGremlinValid },
    watch,
    setValue,
    trigger,
  } = useForm<EditGremlinData>({
    resolver: zodResolver(editGremlinSchema),
    mode: "onChange",
  });

  const gremlinName = watch("name");

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUseGremlinNameAsActivity(e.target.checked);
    if (e.target.checked) {
      setValue("activityName", gremlinName);
      trigger("activityName");
    } else {
      setValue("activityName", "");
      trigger("activityName");
    }
  };

  const handleModeChange = (newMode: "pleasure" | "pain") => {
    setMode(newMode);
    const defaultStyle = newMode === "pleasure" ? 1 : 4;
    setSelectedStyle(defaultStyle);
    setValue("kindOfGremlin", defaultStyle);
  };

  const handleStyleSelect = (style: number) => {
    setSelectedStyle(style);
    setValue("kindOfGremlin", style);
  };

  const handleEdit = (data: EditGremlinData) => {
    const controller = new AbortController();
    const { name, kindOfGremlin, activityName, intensity } = data;

    axiosInstance
      .put(
        "/gremlin",
        { gremlinID, name, activityName, kindOfGremlin, intensity },
        { signal: controller.signal }
      )
      .then((response) => {
        setIsEditGrem(false);
        resetHoveredGremlin();
        updateGremlins();
        console.log("Gremlin edit successful:", response.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.error("Gremlin edit error:", err.message);
      });
    return () => controller.abort();
  };

  // Example color schemes for different styles
  const styleColors =
    mode === "pleasure"
      ? ["#93B1FF", "#137A74", "#FF8754"] // Example colors for pleasure
      : ["#CF5497", "#3993FF", "#FFC42D"]; // Example colors for pain

  const getGremlinImage = (style: number) => {
    switch (style) {
      case 1:
        return gremlinStyle1;
      case 2:
        return gremlinStyle2;
      case 3:
        return gremlinStyle3;
      case 4:
        return gremlinStyle4;
      case 5:
        return gremlinStyle5;
      case 6:
        return gremlinStyle6;
      default:
        return gremlinStyle1; // Default image if style is not within 1-6
    }
  };

  return (
    <Modal isOpen={isEditGrem} onClose={() => setIsEditGrem(false)}>
      <ModalOverlay opacity={90} />
      <ModalContent bg="#333" width={"550px"} maxW={"550px"} padding={45}>
        <ModalCloseButton color="white" />
        <Center mt={2}>
          <Image
            src={getGremlinImage(selectedStyle)}
            objectFit="cover"
            alt={`Gremlin Style ${selectedStyle}`}
            boxSize="180px"
            objectPosition="bottom"
            height={153}
          />
        </Center>
        <Center pt={0} pb={2}>
          <Text fontSize="xl" fontWeight="bold" color="white">
            Edit Gremlin
          </Text>
        </Center>

        {/* Pleasure or Pain Selection */}
        <Center mt={3} gap={0} mb={4}>
          <Button
            colorScheme={mode === "pleasure" ? "purple" : "gray"}
            variant="solid"
            width="230px"
            fontSize="sm"
            height={"30px"}
            borderRightRadius={0}
            onClick={() => handleModeChange("pleasure")}
          >
            Pleasure
          </Button>
          <Button
            colorScheme={mode === "pain" ? "whatsapp" : "gray"}
            variant="solid"
            width="230px"
            fontSize="sm"
            height={"30px"}
            borderLeftRadius={0}
            onClick={() => handleModeChange("pain")}
          >
            Pain
          </Button>
        </Center>

        <form onSubmit={handleGremlinSubmit(handleEdit)}>
          {/* Gremlin Name */}
          <FormControl>
            <FormLabel color="white">Gremlin Name</FormLabel>
            <Input
              {...gremlinRegister("name", { onBlur: () => trigger("name") })}
              onChange={(event) => {
                if (useGremlinNameAsActivity) {
                  setValue("activityName", event.target.value);
                  trigger("activityName");
                }
                trigger("name");
              }}
              onInput={(event) => {
                if (useGremlinNameAsActivity) {
                  setValue("activityName", gremlinName);
                }
              }}
              placeholder="Gremlin Name"
            />
          </FormControl>

          {/* Activity Name */}
          <FormControl mt={4}>
            <FormLabel
              color="white"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              w="100%"
            >
              Activity Name{" "}
              <Checkbox
                isChecked={useGremlinNameAsActivity}
                onChange={handleCheckboxChange}
                colorScheme="blue"
                mb={0}
                p={0}
                size={"sm"}
              >
                Same as Gremlin Name
              </Checkbox>
            </FormLabel>
            {useGremlinNameAsActivity ? (
              <Input
                {...gremlinRegister("activityName", {
                  onBlur: () => trigger("name"),
                })}
                placeholder="Activity Name"
                isDisabled={useGremlinNameAsActivity}
                value={gremlinName}
              />
            ) : (
              <Input
                {...gremlinRegister("activityName", {
                  onBlur: () => trigger("name"),
                })}
                placeholder="Activity Name"
                isDisabled={useGremlinNameAsActivity}
              />
            )}
          </FormControl>

          {/* Style Selection */}
          <FormControl mt={4}>
            <FormLabel
              color="white"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              w="100%"
            >
              Style
              <Text
                onClick={() =>
                  setSelectedStyle(
                    mode === "pleasure"
                      ? Math.floor(Math.random() * 3) + 1
                      : Math.floor(Math.random() * 3) + 4
                  )
                }
                colorScheme="blue"
                mb={0}
                p={0}
                fontSize={"sm"}
                cursor="pointer"
              >
                Randomize
              </Text>
            </FormLabel>
            <Center gap={2}>
              {styleColors.map((color, idx) => {
                const styleNumber = mode === "pleasure" ? idx + 1 : idx + 4;
                return (
                  <Box
                    key={styleNumber}
                    bg={color}
                    width="146px"
                    height="30px"
                    borderRadius={5}
                    cursor="pointer"
                    border={
                      styleNumber === selectedStyle ? "2px solid black" : "none"
                    }
                    onClick={() => handleStyleSelect(styleNumber)}
                  />
                );
              })}
            </Center>
          </FormControl>

          {/* Intensity Slider */}
          <FormControl mt={4}>
            <FormLabel color="white">Intensity</FormLabel>
            <div style={{ paddingLeft: "8px", paddingRight: "8px" }}>
              <Slider
                aria-label="slider-ex-6"
                min={10}
                max={1000}
                step={10}
                value={sliderValue}
                onChange={(val) => {
                  setSliderValue(val);
                  setValue("intensity", val);
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
            isDisabled={!isGremlinValid}
          >
            Confirm Edit
          </Button>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default EditGremlinModal;