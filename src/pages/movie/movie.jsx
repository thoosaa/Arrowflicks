import { useParams } from "react-router-dom";
import { SideBar } from "../../widgets/sidebar";
import styles from "../../shared/styles/main.module.css";
import { useEffect, useState } from "react";
import { MovieMainInfo } from "../../widgets/moviemaininfo";

export function MoviePage() {
    const { movie_id } = useParams();
    const [movie, setMovie] = useState();

    useEffect(() => {
        const fetchMovieData = async () => {
            const movieData = await fetch(
                `/api/movie/${movie_id}?append_to_response=videos%2C%20images&language=en-US`
            ).then((data) => (data = data.json()));
            setMovie(movieData);
        };
        fetchMovieData();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    console.log(movie);

    return (
        <div className={styles.main}>
            <SideBar />
            <MovieMainInfo movie={movie} />
        </div>
    );
}
