import { useEffect, useState } from "react";
import styles from "./moviecard.module.css";
import grayStar from "../../svg/grayStar.svg";
import yellowStar from "../../svg/yellowStar.svg";
import {
    formatVotes,
    formatYear,
    displayIfEmpty,
    formatGenres,
} from "../../../features/correctDisplay";
import { showCorrectPicture } from "../../../features/emptyPosterHandler";

export function MovieCard({ movie, onCardClick, onStarClick }) {
    let [genres, setGenres] = useState("");

    useEffect(() => {
        const fetchGenres = async () => {
            const movieData = await fetch(
                `/api/movie/${movie.id}?language=en-US`
            ).then((data) => (data = data.json()));
            setGenres(movieData.genres);
        };
        fetchGenres();
    }, []);

    return (
        <div
            className={styles.card}
            onClick={(event) => onCardClick(event, movie)}
        >
            <div className={styles.info}>
                {showCorrectPicture(movie.poster_path, 119, 170)}
                <div className={styles.text}>
                    <div className={styles.generalInfo}>
                        <p className={styles.movieName}>{movie.title}</p>
                        <p className={styles.grayText}>
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
                            <p className={styles.grayText}>
                                {formatVotes(movie.vote_count)}
                            </p>
                        </div>
                    </div>

                    <div className={styles.genres}>
                        <p className={styles.grayText}>Genres</p>
                        <p className={styles.genresList}>
                            {formatGenres(genres)}
                        </p>
                    </div>
                </div>
            </div>
            <button className={styles.rate}>
                <img src={grayStar} onClick={onStarClick} />
            </button>
        </div>
    );
}
