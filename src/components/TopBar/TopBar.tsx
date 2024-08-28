import styles from "./TopBar.module.css";
import LoginButton from "../LoginButton/LoginButton";
import AccountButton from "../AccountButton/AccountButton";
import { isAuthenticated } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const isAuth = isAuthenticated();
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.logo} onClick={() => navigate("/")}>
          Dopameter
        </div>
        <div className={styles.buttons}>
          {!isAuth ? <LoginButton /> : <AccountButton />}
        </div>
      </div>
    </>
  );
};

export default TopBar;
