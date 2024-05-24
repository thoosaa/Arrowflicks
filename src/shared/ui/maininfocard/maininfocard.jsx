import styles from "./maininfocard.module.css";
import grayStar from "../../svg/grayStar.svg";
import yellowStar from "../../svg/yellowStar.svg";
import {
    formatDuration,
    formatMoney,
    formatPremiere,
    formatVotes,
    displayIfEmpty,
    formatGenres,
    formatYear,
} from "../../../features/correctDisplay";
import { showCorrectPicture } from "../emptyPosterHandler/emptyPosterHandler";

export function MainInfoCard({ movie }) {
    return (
        <div className={styles["top-card"]}>
            <div className={styles["main-info"]}>
                {showCorrectPicture(movie.poster_path, 250, 352)}
                <div className={styles["info-container"]}>
                    <div className={styles["main-info-container"]}>
                        <p className={`${styles["title"]} inter-bold`}>
                            {movie.title}
                        </p>
                        <p className={`${styles.grey} inter-semibold`}>
                            {displayIfEmpty(movie.release_date, formatYear)}
                        </p>
                        <div className={styles["rating-info-container"]}>
                            <div
                                className={`${styles["rating-number"]} inter-bold`}
                            >
                                <img src={yellowStar} />
                                <p>
                                    {(
                                        Math.round(movie.vote_average * 100) /
                                        100
                                    ).toFixed(2)}
                                </p>
                            </div>
                            <p className={`${styles.grey} inter-semibold`}>
                                ({formatVotes(movie.vote_count)})
                            </p>
                        </div>
                    </div>
                    <div className={styles["additional-info-container"]}>
                        <p className="inter-semibold">Duration: </p>
                        <p className={`${styles.grey} inter-semibold`}>
                            {displayIfEmpty(movie.runtime, formatDuration)}
                        </p>
                        <p className="inter-semibold">Premiere: </p>
                        <p className={`${styles.grey} inter-semibold`}>
                            {displayIfEmpty(movie.release_date, formatPremiere)}
                        </p>
                        <p className="inter-semibold">Budget: </p>
                        <p className={`${styles.grey} inter-semibold`}>
                            {displayIfEmpty(movie.budget, formatMoney)}
                        </p>
                        <p className="inter-semibold">Gross worldwide:</p>{" "}
                        <p className={`${styles.grey} inter-semibold`}>
                            {displayIfEmpty(movie.revenue, formatMoney)}
                        </p>
                        <p className="inter-semibold">Genres:</p>
                        <p className={`${styles.grey} inter-semibold`}>
                            {formatGenres(movie.genres)}
                        </p>
                    </div>
                </div>
            </div>
            <button className={styles["rate"]}>
                <img src={grayStar} />
            </button>
        </div>
    );
}
