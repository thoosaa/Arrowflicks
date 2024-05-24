import { MultiSelect, NumberInput, Select } from "@mantine/core";
import styles from "./searchparams.module.css";
import { useEffect, useState } from "react";

export function SearchWithParams({ callback }) {
    let [genreList, setGenreList] = useState([]);
    const [filters, setFilters] = useState({
        genre: [],
        year: null,
        ratingFrom: null,
        ratingTo: null,
        sortBy: "Most Popular",
    });

    const [genresChoice, setGenresChoice] = useState([]);
    const [genresIsChoiced, setGenresIsChoiced] = useState(false);
    const [yearIsChoiced, setYearIsChoiced] = useState(false);
    const [fromIsChoiced, setFromIsChoiced] = useState(false);
    const [toIsChoiced, setToIsChoiced] = useState(false);

    const callbackFunc = () => callback(filters);

    useEffect(() => {
        callbackFunc();
    }, [filters]);

    useEffect(() => {
        const fetchGenresList = async () => {
            const genresData = await fetch(
                "/api/genre/movie/list?language=en"
            ).then((data) => (data = data.json()));
            const res = genresData.genres.map((genre) => ({
                value: `${genre.id}`,
                label: genre.name,
            }));
            console.log(res);
            setGenreList(res);
        };
        fetchGenresList();
    }, []);

    const changeFilters = async (id, filterValue) => {
        setFilters((oldFilters) => ({ ...oldFilters, [id]: filterValue }));
    };

    const addGenreFilters = (list) => {
        console.log("genres: ", list);
        list.length == 0 ? setGenresIsChoiced(false) : setGenresIsChoiced(true);
        changeFilters("genre", list);
    };

    const addYearFilters = (value) => {
        value == null ? setYearIsChoiced(false) : setYearIsChoiced(true);
        changeFilters("year", value);
    };

    const addFromFilters = (value) => {
        value == null ? setFromIsChoiced(false) : setFromIsChoiced(true);
        changeFilters("ratingFrom", value);
    };

    const addToFilters = (value) => {
        value == null ? setToIsChoiced(false) : setToIsChoiced(true);
        changeFilters("ratingTo", value);
    };

    const addSortFilters = async (value) => {
        await changeFilters("sortBy", value);
    };

    const resetFilters = () => {
        setFilters({
            genre: [],
            year: null,
            ratingFrom: null,
            ratingTo: null,
            sortBy: filters["sortBy"],
        });

        setGenresIsChoiced(false);
        setYearIsChoiced(false);
        setFromIsChoiced(false);
        setToIsChoiced(false);
    };

    let yearsList = [];
    let date = new Date();
    for (let i = date.getFullYear(); i >= 1900; i--) {
        yearsList.push(i.toString());
    }

    let button;
    if (genresIsChoiced || yearIsChoiced || fromIsChoiced || toIsChoiced) {
        button = (
            <button className={styles.resetFilter} onClick={resetFilters}>
                Reset filters
            </button>
        );
    } else {
        button = (
            <button
                className={styles.resetFilter}
                onClick={resetFilters}
                disabled
            >
                Reset filters
            </button>
        );
    }
    return (
        <div className={styles.container}>
            <div className={styles.parametrs}>
                <MultiSelect
                    label="Genres"
                    withCheckIcon={false}
                    placeholder="Select genre"
                    data={genreList}
                    classNames={{
                        root: styles.rootMulti,
                        input: [styles.inputMulti, styles.input],
                        label: styles.inputLabel,
                        option: styles.option,
                    }}
                    id={"genre"}
                    onChange={addGenreFilters}
                    value={filters.genre}
                />
                <Select
                    label="Release year"
                    withCheckIcon={false}
                    placeholder="Select release year"
                    data={yearsList}
                    classNames={{
                        root: styles.rootMulti,
                        input: [styles.inputMulti, styles.input],
                        label: styles.inputLabel,
                        option: styles.option,
                        pills: styles.pill,
                    }}
                    searchable
                    id={"year"}
                    value={filters.year}
                    onChange={addYearFilters}
                />
                <div className={styles.ratingContainer}>
                    <Select
                        label="Ratings"
                        withCheckIcon={false}
                        placeholder="From"
                        min={0}
                        max={10}
                        classNames={{
                            root: styles.rootNumber,
                            label: styles.inputLabel,
                            input: styles.input,
                            option: styles.option,
                        }}
                        data={[
                            "1",
                            "2",
                            "3",
                            "4",
                            "5",
                            "6",
                            "7",
                            "8",
                            "9",
                            "10",
                        ]}
                        id={"ratingFrom"}
                        value={filters.ratingFrom}
                        onChange={addFromFilters}
                    />
                    <Select
                        label=" "
                        withCheckIcon={false}
                        placeholder="To"
                        min={0}
                        max={10}
                        data={[
                            "1",
                            "2",
                            "3",
                            "4",
                            "5",
                            "6",
                            "7",
                            "8",
                            "9",
                            "10",
                        ]}
                        classNames={{
                            root: styles.rootNumber,
                            label: styles.inputLabel,
                            input: styles.input,
                            option: styles.option,
                        }}
                        id={"ratingTwo"}
                        value={filters.ratingTo}
                        onChange={addToFilters}
                    />
                </div>
                {/* <button className={styles.resetFilter} onClick={resetFilters}>
                    Reset filters
                </button> */}
                {button}
            </div>
            <div className={styles.sorting}>
                <Select
                    withCheckIcon={false}
                    label="Sort by"
                    data={[
                        "Most Popular",
                        "Least Popular",
                        "Most Rated",
                        "Least Rated",
                        "Most Voted",
                        "Least Voted",
                    ]}
                    defaultValue={"Most Popular"}
                    classNames={{
                        label: styles.inputLabel,
                        root: styles.rootMulti,
                        option: styles.option,
                        input: styles.input,
                    }}
                    allowDeselect={false}
                    id={"sortBy"}
                    onChange={addSortFilters}
                />
            </div>
        </div>
    );
}
