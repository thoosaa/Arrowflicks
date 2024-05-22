import { MovieCard } from "../../shared/ui/moviecard/moviecard";
import styles from "./moviedisplay.module.css";
import { useState, useEffect } from "react";
import { Pagination, Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { AddRatingModal } from "../../shared/ui/addratingmodal";
import { createRequest } from "../../features/createRequest";

export function MovieDisplay({ options }) {
    const navigate = useNavigate();
    const [modalMovie, setModalMovie] = useState("");
    const [activePage, setPage] = useState(1);
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [opened, { open, close }] = useDisclosure(false);
    const [totalPages, setTotalPages] = useState(0);

    const onCardClick = (event, movie) => {
        if (!event.target?.closest("button")) navigate(`/movies/${movie.id}`);
        else setModalMovie(movie.title);
    };

    useEffect(() => {
        setIsLoading(true);
        const fetchMoviesData = async (activePage = 1) => {
            let moviesData, searchstr;
            searchstr = createRequest(options, activePage);
            /*} else {
                searchstr = `/api/discover/movie?include_adult=false&include_video=false&language=en-US&page=${activePage}&sort_by=popularity.desc`;
            }*/

            moviesData = await fetch(searchstr).then(
                (data) => (data = data.json())
            );

            setTotalPages(moviesData.total_pages);

            setIsLoading(false);
            setMovies(moviesData.results);
        };
        fetchMoviesData(activePage);
    }, [activePage, options]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [activePage]);

    if (isLoading) {
        return (
            <div className={styles.loaderContainer}>
                <Loader color="#9854f6" size="xl" />
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <>
            <div className={styles.container}>
                {movies.map((movie) => (
                    <MovieCard
                        movie={movie}
                        key={movie.id}
                        id={movie.id}
                        onCardClick={onCardClick}
                        onStarClick={open}
                    />
                ))}
                <div className={styles.pag}>
                    <Pagination
                        total={totalPages}
                        value={activePage}
                        onChange={setPage}
                        color="#9854f6"
                    />
                </div>
            </div>
            <AddRatingModal opened={opened} close={close} movie={modalMovie} />
        </>
    );
}
