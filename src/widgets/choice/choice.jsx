import { useState } from "react";
import styles from "./choice.module.css";
import { ChoiceButton } from "../../shared/ui/choiceButton/index.js";
import { Link, useLocation } from "react-router-dom";

export function ChoiceMenu() {
    const location = useLocation();
    let [activeButton, setActiveButton] = useState(location.pathname);

    const changeRoute = (path) => {
        setActiveButton(path);
    };

    return (
        <div className={styles.choice}>
            <Link
                to="/"
                onClick={() => changeRoute("/")}
                style={{ textDecoration: "none" }}
            >
                <ChoiceButton
                    isActive={
                        activeButton == "/" ||
                        activeButton.startsWith("/movies")
                            ? true
                            : false
                    }
                >
                    Movies
                </ChoiceButton>
            </Link>
            <Link
                to="/rated"
                onClick={() => changeRoute("/rated")}
                style={{ textDecoration: "none" }}
            >
                <ChoiceButton
                    isActive={activeButton == "/rated" ? true : false}
                >
                    Rated movies
                </ChoiceButton>
            </Link>
        </div>
    );
}
