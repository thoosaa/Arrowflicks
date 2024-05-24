import styles from "./choicebutton.module.css";

export function ChoiceButton({ children, isActive, ...props }) {
    return (
        <button
            {...props}
            className={`${styles["choice-button"]} inter ${
                isActive ? styles["active"] : styles["not-active"]
            }`}
        >
            {children}
        </button>
    );
}
