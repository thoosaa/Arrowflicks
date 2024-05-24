import styles from "./moviemain.module.css";
import { SearchWithParams } from "../../shared/ui/searchparam";
import { MovieDisplay } from "../moviedisplay/moviedisplay";
import { useState } from "react";

export function MovieMain() {
    const [movieFilters, setMovieFilters] = useState();

    let params = (value) => {
        setMovieFilters(value);
    };

    return (
        <div className={styles.containerMovie}>
            <h1>Movies</h1>
            <SearchWithParams callback={params} />
            <MovieDisplay options={movieFilters} />
        </div>
    );
}
