import styles from "./choicebutton.module.css";

export function ChoiceButton({ children, isActive, ...props }) {
    return (
        <button
            {...props}
            className={isActive ? styles.active : styles.notActive}
        >
            {children}
        </button>
    );
}
