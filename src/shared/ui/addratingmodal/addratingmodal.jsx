import styles from "./addratingmodal.module.css";
import greyStar from "../../svg/grayStar.svg";
import { Modal } from "@mantine/core";

export function AddRatingModal({ movie, opened, close }) {
    return (
        <Modal.Root opened={opened} onClose={close} centered size="380px">
            <Modal.Overlay />
            <Modal.Content>
                <Modal.Header className={styles.modalHeader}>
                    <Modal.Title className={styles.modalTitle}>
                        Your rating
                    </Modal.Title>
                    <Modal.CloseButton />
                </Modal.Header>
                <Modal.Body className={styles.modalBody}>
                    <div className={styles.modalRateContainer}>
                        <p className={styles.movieTitle}>{movie}</p>
                        <div className={styles.starsRating}>
                            {[...Array(10)].map((x, i) => (
                                <img key={i} src={greyStar} />
                            ))}
                        </div>
                        <div className={styles.modalButtons}>
                            <button
                                className={`${styles.modalButton} ${styles.saveButton}`}
                            >
                                Save
                            </button>
                            <button
                                className={`${styles.modalButton} ${styles.removeButton}`}
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
