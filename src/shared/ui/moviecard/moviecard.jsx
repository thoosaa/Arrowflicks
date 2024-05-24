import { useEffect, useState } from "react";
import styles from "./moviecard.module.css";
import grayStar from "../../svg/grayStar.svg";
import yellowStar from "../../svg/yellowStar.svg";
import purpleStar from "../../svg/purpleStar.svg";
import {
    formatVotes,
    formatYear,
    displayIfEmpty,
    formatGenres,
} from "../../../features/correctDisplay";
import { showCorrectPicture } from "../emptyPosterHandler/emptyPosterHandler";

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

    const getRating = (id) => {
        return localStorage.getItem(id);
    };

    const checkRated = (id) => {
        const rating = getRating(id);
        console.log(rating);

        if (!rating) {
            return (
                <button className={styles.rate}>
                    <img src={grayStar} onClick={onStarClick} width={28} />
                </button>
            );
        } else {
            return (
                <div className={styles.rated}>
                    <button className={styles.rate}>
                        <img
                            src={purpleStar}
                            onClick={onStarClick}
                            width={28}
                        />
                    </button>
                    <p>{rating}</p>
                </div>
            );
        }
    };

    const setGapStyleByRating = (id) => {
        const rating = getRating(id);
        if (!rating) {
            return styles.nonRatingGap;
        } else {
            return "";
        }
    };

    return (
        <div
            className={`${styles.card} ${setGapStyleByRating(movie.id)}`}
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
            {checkRated(movie.id)}
        </div>
    );
}
