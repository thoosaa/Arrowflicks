import styles from "./moviemain.module.css";
import { SearchWithParams } from "../../shared/ui/searchparam";
import { MovieDisplay } from "../moviedisplay/moviedisplay";
import { useState } from "react";

export function MovieMain({ title }) {
    const [movieFilters, setMovieFilters] = useState();

    let params = (value) => {
        setMovieFilters(value);
    };

    return (
        <div className={styles.containerMovie}>
            <h1>{title}</h1>
            <SearchWithParams callback={params} />
            <MovieDisplay options={movieFilters} />
        </div>
    );
}
