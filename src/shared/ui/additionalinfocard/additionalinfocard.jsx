import styles from "./additionalinfocard.module.css";
import clapperboard from "../../svg/clapperboard.svg";

export function AdditionalInfoCard({ movie }) {
    const getTrailer = (movie) => {
        const trailer = movie.videos["results"].find(
            (video) =>
                video.name == "Official Trailer" && video.type == "Trailer"
        );
        return trailer ? trailer : "";
    };

    const checkTrailer = (trailer) => {
        if (trailer) {
            return (
                <>
                    <div className={styles["info-section"]}>
                        <p className={`${styles["section-title"]} inter-bold`}>
                            Trailer
                        </p>
                        <iframe
                            className={styles["trailer"]}
                            src={`https://www.youtube.com/embed/${
                                getTrailer(movie).key
                            }`}
                        />
                    </div>
                    <hr className={styles["divider"]} />
                </>
            );
        }
    };

    const checkDescription = (description) => {
        if (description) {
            return (
                <>
                    <div className={styles["info-section"]}>
                        <p className={`${styles["section-title"]} inter-bold`}>
                            Description
                        </p>
                        <p
                            className={`${styles["description-text"]} inter-semibold`}
                        >
                            {movie.overview}
                        </p>
                    </div>
                    <hr className={styles["divider"]} />
                </>
            );
        }
    };

    const checkProductionLogo = (logoPicture) => {
        if (logoPicture) {
            return (
                <div className={styles["production-logo-container"]}>
                    <img
                        className={styles["production-logo"]}
                        src={"http://image.tmdb.org/t/p/w500" + logoPicture}
                    />
                </div>
            );
        } else {
            return (
                <div className={styles["production-logo-not-found-container"]}>
                    <img
                        className={styles["production-logo-not-found"]}
                        src={clapperboard}
                    />
                </div>
            );
        }
    };

    const checkCompanies = (production_companies) => {
        if (production_companies?.length) {
            return (
                <div className={styles["info-section"]}>
                    <p className={styles["section-title"]}>Production</p>
                    <div className={styles["production-list-container"]}>
                        {production_companies.map((company) => (
                            <div
                                className={styles["production-element"]}
                                key={company.id}
                            >
                                {checkProductionLogo(company.logo_path)}
                                <p
                                    className={`${styles["production-name"]} inter-bold`}
                                >
                                    {company.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
    };

    if (!(getTrailer(movie) || movie.overview || movie.production_companies)) {
        return <></>;
    }

    return (
        <div className={styles["bottom-card"]}>
            {checkTrailer(getTrailer(movie))}
            {checkDescription(movie.overview)}
            {checkCompanies(movie.production_companies)}
        </div>
    );
}
