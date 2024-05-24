import search from "../../svg/search.svg";
import styles from "./search.module.css";
import { useState } from "react";
import { TextInput } from "@mantine/core";

export function Search({ setSearchTitle }) {
    const [searchValue, setSearchValue] = useState("");
    return (
        <div className={styles["search"]}>
            <TextInput
                leftSectionPointerEvents="none"
                leftSection={<img src={search} />}
                placeholder="Search movie title"
                classNames={{
                    root: styles["input-root"],
                    input: styles["input"],
                }}
                value={searchValue}
                onChange={(event) => setSearchValue(event.currentTarget.value)}
            />
            <button
                className={styles["search-button"]}
                onClick={() => setSearchTitle(searchValue)}
            >
                Search
            </button>
        </div>
    );
}
