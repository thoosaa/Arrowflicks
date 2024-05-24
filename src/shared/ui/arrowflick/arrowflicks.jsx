import styles from "./arrowflick.module.css";
import logo from "./logo.svg";

export function ArrowFlicks() {
    return (
        <div className={styles["arrowflicks"]}>
            <img src={logo} className={styles["logo"]}></img>
            <p className={`${styles["company-name"]} poppins-bold`}>
                ArrowFlicks
            </p>
        </div>
    );
}
