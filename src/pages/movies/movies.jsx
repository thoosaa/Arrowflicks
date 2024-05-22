import { SideBar } from "../../widgets/sidebar";
import { MovieMain } from "../../widgets/moviemain/moviemain";
import styles from "../../shared/styles/main.module.css";

export function MoviesPage() {
    return (
        <div className={styles.main}>
            <SideBar />
            <MovieMain title="Movies" />
        </div>
    );
}
