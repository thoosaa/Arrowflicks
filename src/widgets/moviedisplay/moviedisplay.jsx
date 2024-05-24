import { MovieCard } from "../../shared/ui/moviecard/moviecard";
import styles from "./moviedisplay.module.css";
import { useState, useEffect } from "react";
import { Pagination, Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { AddRatingModal } from "../../shared/ui/addratingmodal";
import { createRequest } from "../../features/createRequest";
import notFoundMovies from "../../shared/svg/notFoundMovies.svg";
import axios from "axios";

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
        else setModalMovie(movie);
    };

    useEffect(() => {
        setIsLoading(true);
        const fetchMoviesData = async (activePage = 1) => {
            let moviesData, searchstr;
            /*if (options) {
                searchstr = createRequest(options, activePage);
            } else {*/
            searchstr = `/api/movie/popular?page=${activePage}`;
            const response = await axios.get(searchstr);
            moviesData = response.data;
            setTotalPages(
                moviesData.total_pages > 500 ? 500 : moviesData.total_pages
            );

            setIsLoading(false);
            console.log(moviesData.results);
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

    if (!movies.length) {
        return (
            <div className={styles.notFound}>
                <img src={notFoundMovies} />
                <p>We don't have such movies, look for another one</p>
            </div>
        );
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.moviesContainer}>
                    {movies.map((movie) => (
                        <MovieCard
                            movie={movie}
                            key={movie.id}
                            id={movie.id}
                            onCardClick={onCardClick}
                            onStarClick={open}
                        />
                    ))}
                </div>
                <div className={styles.pag}>
                    <Pagination
                        total={totalPages}
                        value={activePage}
                        onChange={setPage}
                        color="#9854f6"
                        getItemProps={(page) => {
                            if (
                                page === activePage - 1 ||
                                page === activePage ||
                                page === activePage + 1 ||
                                (activePage === 1 && page === activePage + 2) ||
                                (activePage === totalPages &&
                                    page === activePage - 2)
                            ) {
                                return {};
                            }

                            return { style: { display: "none" } };
                        }}
                        styles={(theme) => ({
                            dots: { display: "none" },
                        })}
                    />
                </div>
            </div>
            <AddRatingModal opened={opened} close={close} movie={modalMovie} />
        </>
    );
}
