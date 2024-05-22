import { MainInfoCard } from "../../shared/ui/maininfocard/maininfocard";
import styles from "./moviemaininfo.module.css";
import { Link } from "react-router-dom";
import { Loader } from "@mantine/core";
import { AdditionalInfoCard } from "../../shared/ui/additionalinfocard/additionalinfocard";

export function MovieMainInfo({ movie }) {
    if (!movie) {
        return (
            <div className={styles.loaderContainer}>
                <Loader color="#9854f6" size="xl" />
                <p>Loading...</p>
            </div>
        );
    }
    return (
        <div className={styles.containerMovie}>
            <div className={styles.title}>
                <p>
                    <Link
                        to="/"
                        style={{ textDecoration: "none", color: "#9854f6" }}
                    >
                        Movies
                    </Link>
                </p>{" "}
                <p style={{ color: "black" }}>/</p> <p>{movie.title}</p>
            </div>
            <MainInfoCard movie={movie} />
            <AdditionalInfoCard movie={movie} />
        </div>
    );
}
