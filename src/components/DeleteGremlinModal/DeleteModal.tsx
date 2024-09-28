import {
  Button,
  Center,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import axiosInstance from "../../api/api-client";
import useGremlins from "../../hooks/useGremlins";
import { CanceledError } from "axios";

interface FeedModalProps {
  isDelGremlin: boolean;
  gremlinID: number;
  gremlinStyle: number;
  gremlinName: string;
  setIsDelGremlin: (value: boolean) => void;
  resetHoveredGremlin: () => void;
}

const FeedModal = ({
  isDelGremlin,
  gremlinID,
  gremlinName,
  setIsDelGremlin,
  resetHoveredGremlin,
}: FeedModalProps) => {
  const { updateGremlins } = useGremlins();

  const handleDel = () => {
    const controller = new AbortController();

    axiosInstance
      .delete("/gremlin/" + gremlinID)
      .then((response) => {
        setIsDelGremlin(false);
        resetHoveredGremlin();
        updateGremlins();
        console.log("Gremlin delete successful:", response.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.error("Gremlin delete error:", err.message);
      });

    return () => controller.abort();
  };

  return (
    <Modal isOpen={isDelGremlin} onClose={() => setIsDelGremlin(false)}>
      <ModalOverlay opacity={90} />
      <ModalContent bg="#333" width={"550px"} maxW={"550px"} padding={45}>
        <ModalCloseButton color="white" />
        <Center pt={0} pb={0}>
          <Text fontSize="l" fontWeight="bold" color="white" textAlign="center">
            Are you sure you want to delete Gremlin {gremlinName}?
          </Text>
        </Center>
        <Button
          colorScheme="blue"
          width="100%"
          mx="auto"
          mt={7}
          onClick={() => handleDel()}
        >
          Confirm Delete Gremlin
        </Button>
      </ModalContent>
    </Modal>
  );
};

export default FeedModal;
