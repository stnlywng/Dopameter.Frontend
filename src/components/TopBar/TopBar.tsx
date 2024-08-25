import styles from "./TopBar.module.css";
import LoginButton from "../LoginButton/LoginButton";
import SignUpButton from "../SignUpButton/SignUpButton";

const TopBar = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.logo}>Dopameter</div>
                <div className={styles.buttons}>
                    <LoginButton />
                    <SignUpButton />
                </div>
            </div>
        </>
    );
};

export default TopBar;
