import {
    Button,
    Center,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    Text,
    Image,
} from "@chakra-ui/react";
import { useLogin } from "../../state-management/contexts/loginContext";
import React, { useState, useRef, useEffect } from "react";
import styles from "./LoginSighupModal.module.css";
import { useUser } from "../../state-management/contexts/userContext";
import axios, { CanceledError } from "axios";
import { useNavigate } from "react-router-dom";

type AuthResponse = {
    token: string;
    userId: number;
};

const LoginSighupModal = () => {
    const { isOpen, setLoginOpen } = useLogin();
    const { setUserId } = useUser();

    const [error, setError] = useState<string | null>(null);
    const [isLogin, setIsLogin] = useState(true);

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate(); // For redirecting

    // Generic input handler
    const handleInputChange = (
        ref: React.RefObject<HTMLInputElement>,
        value: string
    ) => {
        if (ref.current) {
            ref.current.value = value;
        }
    };

    const handleLogin = () => {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        const controller = new AbortController();

        axios
            .post<AuthResponse>(
                "https://your-api.com/auth/login",
                { username, password },
                { signal: controller.signal }
            )
            .then((response) => {
                const { token, userId } = response.data;

                // Store the token and userId in localStorage
                localStorage.setItem("jwt", token);
                localStorage.setItem("userId", userId.toString());

                setUserId(userId);

                // Redirect to a protected page after successful login
                navigate("/dashboard");

                // Optionally, you can also set these values in your state/context
                console.log("Login successful:", response.data);
            })
            .catch((err) => {
                if (err instanceof CanceledError) return;
                setError(err.message);
                console.error("Login error:", err.message);
            });
        return () => controller.abort();
    };

    const renderToggleText = () => (
        <Text mt={6} mb={0} color="white">
            {isLogin ? (
                <>
                    New to Dopameter?{" "}
                    <Button
                        className={styles.transparentButton}
                        color="#6bc1ff"
                        variant="link"
                        onClick={() => setIsLogin(false)}
                    >
                        Create an account.
                    </Button>
                </>
            ) : (
                <>
                    Already have an account?{" "}
                    <Button
                        className={styles.transparentButton}
                        color="#6bc1ff"
                        variant="link"
                        onClick={() => setIsLogin(true)}
                    >
                        Login here
                    </Button>
                </>
            )}
        </Text>
    );

    return (
        <Modal isOpen={isOpen} onClose={() => setLoginOpen(false)}>
            <ModalOverlay />
            <ModalContent bg="#333">
                <ModalCloseButton color="white" />
                <Center mt={10}>
                    <Image
                        src="/src/assets/dopameter_logo.png"
                        alt="Website Logo"
                        boxSize="100px"
                    />
                </Center>
                <Center pt={-2} pb={2}>
                    <Text fontSize="3xl" fontWeight="bold" color="white">
                        Dopameter
                    </Text>
                </Center>
                <ModalBody pb={0}>
                    <FormControl>
                        <FormLabel color="white">
                            Username or Email Address
                        </FormLabel>
                        <Input
                            ref={usernameRef}
                            onChange={(e) =>
                                handleInputChange(usernameRef, e.target.value)
                            }
                            placeholder="Username"
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel
                            color="white"
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            w="100%"
                        >
                            Password
                            {isLogin && (
                                <Button
                                    variant="link"
                                    color="#6bc1ff"
                                    className={styles.transparentButton}
                                    fontSize="sm"
                                    onClick={() =>
                                        console.log("Forgot Password Clicked")
                                    }
                                >
                                    Forgot password?
                                </Button>
                            )}
                        </FormLabel>
                        <Input
                            ref={passwordRef}
                            onChange={(e) =>
                                handleInputChange(passwordRef, e.target.value)
                            }
                            type="password"
                            placeholder="Password"
                        />
                    </FormControl>

                    <Button
                        colorScheme="blue"
                        width="100%"
                        mx="auto"
                        mt={7}
                        onClick={handleLogin}
                    >
                        {isLogin ? "Login" : "Sign Up"}
                    </Button>

                    <Center>{renderToggleText()}</Center>
                </ModalBody>

                <ModalFooter />
            </ModalContent>
        </Modal>
    );
};

export default LoginSighupModal;
