import { useEffect, useState } from "react";
import { Modal } from "@mantine/core";
import styles from "./addratingmodal.module.css";
import greyStar from "../../svg/grayStar.svg";
import yellowStar from "../../svg/yellowStar.svg";

export function AddRatingModal({ movie, opened, close }) {
    const [hoveredStar, setHoveredStar] = useState(null);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        const rating = localStorage.getItem(movie.id);
        console.log(movie.title);
        setRating(rating);
    }, [opened]);

    const saveRating = () => {
        if (rating == null) {
            return;
        }
        localStorage.setItem(movie.id, rating);
        close();
    };

    const removeRating = () => {
        setRating(0);
        localStorage.removeItem(movie.id);
        close();
    };

    return (
        <Modal.Root
            opened={opened}
            onClose={close}
            size="380px"
            zIndex={1000}
            centered
        >
            <Modal.Overlay />
            <Modal.Content>
                <Modal.Header className={styles["modal-header"]}>
                    <Modal.Title
                        className={`${styles["modal-title"]} inter-semibold`}
                    >
                        Your rating
                    </Modal.Title>
                    <Modal.CloseButton />
                </Modal.Header>
                <Modal.Body className={styles["modal-body"]}>
                    <div className={styles["modal-rate-container"]}>
                        <p className={`${styles["movie-title"]} inter-bold`}>
                            {movie.title}
                        </p>
                        <div className={styles["stars-rating-container"]}>
                            {[...Array(10)].map((x, i) => (
                                <img
                                    key={i}
                                    src={
                                        i <
                                        (hoveredStar !== null
                                            ? hoveredStar
                                            : rating)
                                            ? yellowStar
                                            : greyStar
                                    }
                                    onClick={() => setRating(i + 1)}
                                    onMouseEnter={() => setHoveredStar(i + 1)}
                                    onMouseLeave={() => setHoveredStar(null)}
                                    alt={`Star ${i + 1}`}
                                    width={28}
                                    height={28}
                                />
                            ))}
                        </div>
                        <div className={styles["modal-buttons-container"]}>
                            <button
                                className={`${styles["modal-button"]} ${styles["save-button"]} inter-bold`}
                                onClick={saveRating}
                            >
                                Save
                            </button>
                            <button
                                className={`${styles["modal-button"]} ${styles["remove-button"]} inter-bold`}
                                onClick={removeRating}
                            >
                                Remove rating
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    );
}
