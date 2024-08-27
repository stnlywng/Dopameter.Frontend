import styles from "./TopBar.module.css";
import LoginButton from "../LoginButton/LoginButton";
import AccountButton from "../AccountButton/AccountButton";
import { isAuthenticated } from "../../utils/auth";

const TopBar = () => {
  const isAuth = isAuthenticated();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.logo}>Dopameter</div>
        <div className={styles.buttons}>
          {!isAuth ? <LoginButton /> : <AccountButton />}
        </div>
      </div>
    </>
  );
};

export default TopBar;
