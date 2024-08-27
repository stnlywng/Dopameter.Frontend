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
import React, { useState } from "react";
import styles from "./LoginSighupModal.module.css";
import { useUser } from "../../state-management/contexts/userContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/api-client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CanceledError } from "axios";

// Define validation schemas
const loginSchema = z.object({
  username: z.string().min(1, { message: "Username or Email is required" }),
  password: z.string(),
});

const signupSchema = z
  .object({
    username: z.string().min(1, { message: "Username is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    reEnterPassword: z.string(),
  })
  .refine((data) => data.password === data.reEnterPassword, {
    message: "Passwords must match",
    path: ["reEnterPassword"], // Path of the field to display error
  });

type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

type AuthResponse = {
  token: string;
  userID: number;
  email: string;
  username: string;
};

const LoginSighupModal = () => {
  const { isOpen, setLoginOpen } = useLogin();
  const { setUserID, setEmail, setUsername } = useUser();
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); // For redirecting

  // Login form handling
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors, isValid: isLoginValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  // Signup form handling
  const {
    register: signupRegister,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors, isValid: isSignupValid },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const handleLogin = (data: LoginFormData) => {
    const controller = new AbortController();
    const { username, password } = data;

    axiosInstance
      .post<AuthResponse>(
        "/login",
        { username, password },
        { signal: controller.signal }
      )
      .then((response) => {
        const { token, userID, username, email } = response.data;

        // Store the token and userId in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("userID", userID.toString());

        setUserID(userID);
        setEmail(email);
        setUsername(username);

        // Redirect to a protected page after successful login
        navigate("/home");

        // Optionally, you can also set these values in your state/context
        console.log("Login successful:", response.data);
        console.log(localStorage.getItem("token")); // Check if token is being stored
        console.log("username set to: ", username);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.error("Login error:", err.message);
      });
    return () => controller.abort();
  };

  /*

  const handleLogin = () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    const controller = new AbortController();

    axiosInstance
      .post<AuthResponse>(
        "/login",
        { username, password },
        { signal: controller.signal }
      )
      .then((response) => {
        const { token, userID, username, email } = response.data;

        // Store the token and userId in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("userID", userID.toString());

        setUserID(userID);
        setEmail(email);
        setUsername(username);

        // Redirect to a protected page after successful login
        navigate("/home");

        // Optionally, you can also set these values in your state/context
        console.log("Login successful:", response.data);
        console.log(localStorage.getItem("token")); // Check if token is being stored
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        console.error("Login error:", err.message);
      });
    return () => controller.abort();
  };
  */

  const handleSignup = (data: SignupFormData) => {
    const controller = new AbortController();
    const { username, email, password } = data;

    axiosInstance
      .post<AuthResponse>(
        "/signup",
        { username, email, password },
        { signal: controller.signal }
      )
      .then((response) => {
        const { token, userID, username, email } = response.data;

        // Store the token and userId in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("userID", userID.toString());

        setUserID(userID);
        setEmail(email);
        setUsername(username);

        // Redirect to a protected page after successful login
        navigate("/home");

        // Optionally, you can also set these values in your state/context
        console.log("Sign Up successful:", response.data);
        console.log(localStorage.getItem("token")); // Check if token is being stored
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.error("Sign Up error:", err.message);
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
            src="/src/assets/dopameter_logo2.png"
            alt="Website Logo"
            boxSize="100px"
            width={140}
          />
        </Center>
        <Center pt={0} pb={2}>
          <Text fontSize="3xl" fontWeight="bold" color="white">
            Dopameter
          </Text>
        </Center>
        <ModalBody pb={0}>
          <form
            onSubmit={
              isLogin
                ? handleLoginSubmit(handleLogin)
                : handleSignupSubmit(handleSignup)
            }
          >
            <FormControl>
              <FormLabel color="white">
                {isLogin ? "Username or Email Address" : "Username"}
              </FormLabel>
              <Input
                {...(isLogin
                  ? loginRegister("username")
                  : signupRegister("username"))}
                placeholder={isLogin ? "Username or Email" : "Username"}
              />
              {isLogin && loginErrors.username && (
                <Text color="red.500" fontSize="sm">
                  {loginErrors.username.message}
                </Text>
              )}
              {!isLogin && signupErrors.username && (
                <Text color="red.500" fontSize="sm">
                  {signupErrors.username.message}
                </Text>
              )}
            </FormControl>

            {!isLogin && (
              <FormControl mt={4}>
                <FormLabel color="white">Email Address</FormLabel>
                <Input
                  {...signupRegister("email")}
                  type="email"
                  placeholder="Email Address"
                />
                {signupErrors.email && (
                  <Text color="red.500" fontSize="sm">
                    {signupErrors.email.message}
                  </Text>
                )}
              </FormControl>
            )}

            <FormControl mt={4}>
              <FormLabel color="white">Password</FormLabel>
              <Input
                {...(isLogin
                  ? loginRegister("password")
                  : signupRegister("password"))}
                type="password"
                placeholder="Password"
              />
              {isLogin && loginErrors.password && (
                <Text color="red.500" fontSize="sm">
                  {loginErrors.password.message}
                </Text>
              )}
              {!isLogin && signupErrors.password && (
                <Text color="red.500" fontSize="sm">
                  {signupErrors.password.message}
                </Text>
              )}
            </FormControl>

            {!isLogin && (
              <FormControl mt={4}>
                <FormLabel color="white">Re-enter Password</FormLabel>
                <Input
                  {...signupRegister("reEnterPassword")}
                  type="password"
                  placeholder="Re-enter Password"
                />
                {signupErrors.reEnterPassword && (
                  <Text color="red.500" fontSize="sm">
                    {signupErrors.reEnterPassword.message}
                  </Text>
                )}
              </FormControl>
            )}

            <Button
              colorScheme="blue"
              width="100%"
              mx="auto"
              mt={7}
              type="submit"
              disabled={!isLogin ? !isSignupValid : !isLoginValid}
            >
              {isLogin ? "Login" : "Sign Up"}
            </Button>
          </form>

          <Center>{renderToggleText()}</Center>
        </ModalBody>

        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default LoginSighupModal;
