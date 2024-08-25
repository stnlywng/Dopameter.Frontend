import { Button } from "@chakra-ui/react";

const SignUpButton = () => {
    return (
        <Button
            colorScheme="purple"
            backgroundColor="#9D8DF1"
            _hover={{ bg: "#9484E3" }}
            variant="solid"
            onClick={() => console.log("sign up clicked")}
        >
            Sign up
        </Button>
    );
};

export default SignUpButton;
