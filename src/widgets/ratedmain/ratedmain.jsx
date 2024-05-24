import styles from "./ratedmain.module.css";
import { TextInput, Pagination } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MovieCard } from "../../shared/ui/moviecard/moviecard";
import { useState, useEffect } from "react";
import { AddRatingModal } from "../../shared/ui/addratingmodal";
import { useNavigate } from "react-router-dom";
import { Search } from "../../shared/ui/search";
import { RatedDisplay } from "../rateddisplay/rateddisplay";

export function RatedMain() {
    const navigate = useNavigate();
    const [searchTitle, setSearchTitle] = useState("");
    const [movies, setMovies] = useState([]);
    const [modalMovie, setModalMovie] = useState("");
    const [activePage, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [opened, { open, close }] = useDisclosure(false);

    const onCardClick = (event, movie) => {
        if (!event.target?.closest("button")) navigate(`/movies/${movie.id}`);
        else setModalMovie(movie);
    };

    useEffect(() => {
        const fetchAllMovies = async () => {
            const movieKeys = Object.keys(localStorage);
            const movieDataPromises = movieKeys.map(async (key) => {
                const response = await fetch(
                    `/api/movie/${key}?language=en-US`
                );
                return response.json();
            });

            let movieData = await Promise.all(movieDataPromises);
            if (searchTitle) {
                movieData = movieData.filter((movie) =>
                    movie.title
                        .toLowerCase()
                        .includes(searchTitle.toLowerCase())
                );
            }
            console.log("length", movieData.length);
            setTotalPages(Math.ceil(movieData.length / 4));
            setMovies(
                movieData.slice((activePage - 1) * 4, (activePage - 1) * 4 + 4)
            );
        };

        fetchAllMovies();
    }, [opened, activePage, searchTitle]);

    return (
        <div className={styles.mainContainer}>
            <div className={styles.titleSearch}>
                <h1>Rated movies</h1>
                <Search setSearchTitle={setSearchTitle} />
            </div>
            <RatedDisplay
                movies={movies}
                onCardClick={onCardClick}
                open={open}
                totalPages={totalPages}
                activePage={activePage}
                setPage={setPage}
            />
            <AddRatingModal opened={opened} close={close} movie={modalMovie} />
        </div>
    );
}
