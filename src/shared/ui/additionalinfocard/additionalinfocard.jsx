import styles from "./additionalinfocard.module.css";
import clapperboard from "./clapperboard.svg";

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
                    <div className={styles.section}>
                        <p className={styles.sectionTitle}>Trailer</p>
                        <iframe
                            className={styles.trailer}
                            src={`https://www.youtube.com/embed/${
                                getTrailer(movie).key
                            }`}
                        />
                    </div>
                    <hr className={styles.divider} />
                </>
            );
        }
    };

    const checkDescription = (description) => {
        if (description) {
            return (
                <>
                    <div className={styles.section}>
                        <p className={styles.sectionTitle}>Description</p>
                        <p className={styles.descriptionText}>
                            {movie.overview}
                        </p>
                    </div>
                    <hr className={styles.divider} />
                </>
            );
        }
    };

    const checkProductionLogo = (logoPicture) => {
        if (logoPicture) {
            return (
                <div className={styles.productionLogoContainer}>
                    <img
                        className={styles.productionLogo}
                        src={"http://image.tmdb.org/t/p/w500" + logoPicture}
                    />
                </div>
            );
        } else {
            return (
                <div className={styles.productionLogoNotFoundContainer}>
                    <img
                        className={styles.productionLogoNotFound}
                        src={clapperboard}
                    />
                </div>
            );
        }
    };

    const checkCompanies = (production_companies) => {
        if (production_companies?.length) {
            return (
                <div className={styles.section}>
                    <p className={styles.sectionTitle}>Production</p>
                    <div className={styles.prodList}>
                        {production_companies.map((company) => (
                            <div
                                className={styles.prodElement}
                                key={company.id}
                            >
                                {checkProductionLogo(company.logo_path)}
                                <p className={styles.productionName}>
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
        <div className={styles.bottomCard}>
            {checkTrailer(getTrailer(movie))}
            {checkDescription(movie.overview)}
            {checkCompanies(movie.production_companies)}
        </div>
    );
}
