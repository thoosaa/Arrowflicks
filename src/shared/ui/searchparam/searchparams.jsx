import { MultiSelect, NumberInput, Select } from "@mantine/core";
import styles from "./searchparams.module.css";
import { useEffect, useState } from "react";

export function SearchWithParams({ callback }) {
    //let [placeholder, setPlaceholder] = useState("Select genre");
    let [genreList, setGenreList] = useState([]);
    const [filters, setFilters] = useState({
        genre: null,
        year: null,
        ratingFrom: null,
        ratingTo: null,
        sortBy: "Most Popular",
    });

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
        changeFilters("genre", list);
    };

    const addYearFilters = (value) => {
        changeFilters("year", value);
    };

    const addFromFilters = (value) => {
        changeFilters("ratingFrom", value);
    };

    const addToFilters = (value) => {
        changeFilters("ratingTo", value);
    };

    const addSortFilters = async (value) => {
        await changeFilters("sortBy", value);
    };

    const resetFilters = () => {
        setFilters({
            genre: null,
            year: null,
            ratingFrom: null,
            ratingTo: null,
            sortBy: "Most Popular",
        });
    };

    let largeData = [];
    let date = new Date();
    for (let i = date.getFullYear(); i >= 1900; i--) {
        largeData.push(i.toString());
    }

    /*useEffect(() => {
        console.log(value);
        if (value?.length) setPlaceholder("");
        else setPlaceholder("Select genres");
    }, [value]);*/

    return (
        <div className={styles.container}>
            <div className={styles.parametrs}>
                <MultiSelect
                    label="Genres"
                    placeholder="Select genre"
                    data={genreList}
                    classNames={{
                        root: styles.rootMulti,
                        input: [styles.inputMulti, styles.input],
                        label: styles.inputLabel,
                        option: styles.option,
                        pill: styles.pill,
                    }}
                    styles={{
                        pill: {
                            withRemoveButton: true,
                        },
                    }}
                    id={"genre"}
                    onChange={addGenreFilters}
                />
                <Select
                    label="Release year"
                    placeholder="Select release year"
                    data={largeData}
                    classNames={{
                        root: styles.rootMulti,
                        input: [styles.inputMulti, styles.input],
                        label: styles.inputLabel,
                        option: styles.option,
                    }}
                    searchable
                    id={"year"}
                    onChange={addYearFilters}
                />
                <div className={styles.ratingContainer}>
                    <Select
                        label="Ratings"
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
                        onChange={addFromFilters}
                    />
                    <Select
                        label=" "
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
                        onChange={addToFilters}
                    />
                </div>
                <button className={styles.resetFilter}>Reset filters</button>
            </div>
            <div className={styles.sorting}>
                <Select
                    withCheckIcon={false}
                    label="Sort by"
                    data={[
                        "Most popular",
                        "Least popular",
                        "Most rated",
                        "Least rated",
                        "Most voted",
                        "Least voted",
                    ]}
                    defaultValue={"Most popular"}
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
