export function createRequest(options, activePage) {
    let sortParam, genreParam, yearParam, fromParam, toParam;

    if (options?.sortBy != null) {
        sortParam = convertSort(options.sortBy);
    }

    if (options?.genre != null) {
        genreParam = convertGenresId(options.genre);
    }

    if (options?.year != null) {
        yearParam = Number(options.year);
    }

    if (options?.ratingFrom != null) {
        fromParam = Number(options.ratingFrom);
    }

    if (options?.ratingTo != null) {
        toParam = Number(options.ratingTo);
    }

    let outputStr = `/api/discover/movie?include_adult=false&include_video=false&language=en-US&page=${activePage}&`;
    if (fromParam != null) {
        outputStr += `&vote_average.gte=${fromParam}`;
    }
    if (toParam != null) {
        outputStr += `&vote_average.lte=${toParam}`;
    }

    if (genreParam != null) {
        outputStr += `&with_genres=${genreParam}`;
    }
    if (yearParam != null) {
        outputStr += `&primary_release_year=${yearParam}`;
    }
    if (sortParam != null) {
        outputStr += `&sort_by=${sortParam}`;
    }

    return outputStr;
}

function convertSort(options) {
    const data = {
        "Most Popular": "popularity.desc",
        "Least Popular": "popularity.asc",
        "Most Rated": "vote_average.desc",
        "Least Rated": "vote_average.asc",
        "Most Voted": "vote_count.desc",
        "Least Voted": "vote_count.asc",
    };

    return data[options];
}

function convertGenresId(options) {
    let ids_str = "";

    options.map((element) => {
        ids_str += element;
        ids_str += ",";
    });

    return ids_str;
}
