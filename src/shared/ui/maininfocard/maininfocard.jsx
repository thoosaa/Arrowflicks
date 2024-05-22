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
        <div className={styles.topCard}>
            <div className={styles.mainInfo}>
                {showCorrectPicture(movie.poster_path, 250, 352)}
                <div className={styles.textInfo}>
                    <div className={styles.mainParams}>
                        <p className={styles.title}>{movie.title}</p>
                        <p className={styles.grey}>
                            {displayIfEmpty(movie.release_date, formatYear)}
                        </p>
                        <div className={styles.ratingRevenue}>
                            <div className={styles.ratingInfo}>
                                <img src={yellowStar} />
                                <p>
                                    {(
                                        Math.round(movie.vote_average * 100) /
                                        100
                                    ).toFixed(2)}
                                </p>
                            </div>
                            <p className={styles.grey}>
                                ({formatVotes(movie.vote_count)})
                            </p>
                        </div>
                    </div>
                    <div className={styles.movieParams}>
                        <p className={styles.text}>Duration: </p>
                        <p className={styles.grey}>
                            {displayIfEmpty(movie.runtime, formatDuration)}
                        </p>
                        <p className={styles.text}>Premiere: </p>
                        <p className={styles.grey}>
                            {displayIfEmpty(movie.release_date, formatPremiere)}
                        </p>
                        <p className={styles.text}>Budget: </p>
                        <p className={styles.grey}>
                            {displayIfEmpty(movie.budget, formatMoney)}
                        </p>
                        <p className={styles.text}>Gross worldwide:</p>{" "}
                        <p className={styles.grey}>
                            {displayIfEmpty(movie.revenue, formatMoney)}
                        </p>
                        <p className={styles.text}>Genres:</p>
                        <p className={styles.grey}>
                            {formatGenres(movie.genres)}
                        </p>
                    </div>
                </div>
            </div>
            <button className={styles.rate}>
                <img src={grayStar} />
            </button>
        </div>
    );
}
