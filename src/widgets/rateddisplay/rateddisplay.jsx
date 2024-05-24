import styles from "./rateddisplay.module.css";
import { MovieCard } from "../../shared/ui/moviecard/index.js";
import { Pagination } from "@mantine/core";

export function RatedDisplay({
    movies,
    onCardClick,
    open,
    totalPages,
    activePage,
    setPage,
}) {
    return (
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
                />
            </div>
        </div>
    );
}
