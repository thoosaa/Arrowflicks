import styles from "./arrowflick.module.css";
import logo from "./logo.svg";

export function ArrowFlicks() {
    return (
        <div className={styles.ArrowFlicks}>
            <img src={logo}></img>
            <p>ArrowFlicks</p>
        </div>
    );
}
