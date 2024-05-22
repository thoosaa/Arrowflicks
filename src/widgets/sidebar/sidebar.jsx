import { ArrowFlicks } from "../../shared/ui/arrowflick";
import { ChoiceMenu } from "../choice/choice";
import styles from "./sidebar.module.css";

export function SideBar() {
    return (
        <nav className={styles.sideBar}>
            <ArrowFlicks />
            <ChoiceMenu />
        </nav>
    );
}
