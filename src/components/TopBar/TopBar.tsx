import styles from "./TopBar.module.css";
import LoginButton from "../LoginButton/LoginButton";
import AccountButton from "../AccountButton/AccountButton";
import { isAuthenticated } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";

const TopBar = () => {
  const isAuth = isAuthenticated();
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.logo}>
          <b onClick={() => navigate("/")}>Dopameter</b>
          <Button
            borderColor={"white"}
            color={"white"}
            borderRadius={8}
            borderWidth={1}
            background={"transparent"}
            onClick={() => navigate("/info")}
            size={"sm"}
            _hover={{
              backgroundColor: "#fafafa",
              color: "black",
              borderColor: "black",
            }}
            width={150}
            height={9}
            marginRight={"10px"}
            marginLeft={"20px"}
          >
            How it works.
          </Button>
          <Button
            borderColor={"white"}
            color={"white"}
            borderRadius={8}
            borderWidth={1}
            background={"transparent"}
            size={"sm"}
            _hover={{
              backgroundColor: "#fafafa",
              color: "black",
              borderColor: "black",
            }}
            width={150}
            height={9}
            onClick={() => navigate("/demo")}
          >
            See a Demo.
          </Button>
        </div>

        <div className={styles.buttons}>
          {!isAuth ? <LoginButton /> : <AccountButton />}
        </div>
      </div>
    </>
  );
};

export default TopBar;
