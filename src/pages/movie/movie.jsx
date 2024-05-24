import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SideBar } from "../../widgets/sidebar";
import { MovieMainInfo } from "../../widgets/moviemaininfo";

export function MoviePage() {
    const { movie_id } = useParams();
    const [movie, setMovie] = useState();

    useEffect(() => {
        const fetchMovieData = async () => {
            const response = await axios.get(
                `/api/3/movie/${movie_id}?append_to_response=videos%2C%20images&language=en-US`
            );
            const movieData = response.data;
            setMovie(movieData);
        };
        fetchMovieData();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    console.log(movie);

    return (
        <div className="movie-page-layout">
            <SideBar />
            <MovieMainInfo movie={movie} />
        </div>
    );
}
