import styles from "./emptyPosterHandler.module.css";
import noPoster from "../../svg/posterNotFound.svg";

export function showCorrectPicture(path, width, height) {
    if (path) {
        return (
            <img
                src={"http://image.tmdb.org/t/p/w500" + path}
                width={width}
                height={height}
            />
        );
    } else {
        return (
            <div className={styles["empty-container"]}>
                <img src={noPoster} width={24} height={24} />
                <p className={styles["text-in-empty-container"]}>No Poster</p>
            </div>
        );
    }
}
