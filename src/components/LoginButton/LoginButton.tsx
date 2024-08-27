import { Button } from "@chakra-ui/react";
import { useLogin } from "../../state-management/contexts/loginContext";
import LoginSighupModal from "../LoginSignupModal/LoginSighupModal";

const LoginButton = () => {
  const { isOpen, setLoginOpen } = useLogin();

  return (
    <>
      <Button
        colorScheme="purple"
        backgroundColor="#9D8DF1"
        _hover={{ bg: "#9484E3" }}
        variant="solid"
        onClick={() => setLoginOpen(true)}
      >
        Log in / Register
      </Button>
      {isOpen && <LoginSighupModal />}
    </>
  );
};

export default LoginButton;
