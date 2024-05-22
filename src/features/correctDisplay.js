export const formatVotes = (votes) => {
    return Intl.NumberFormat("en", { notation: "compact" }).format(votes);
};
export const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remaining = minutes % 60;
    return `${hours}h ${remaining.toString().padStart(2, "0")}m`;
};

export const formatMoney = (number) => {
    return `\$${number.toLocaleString("en-US")}`;
};

export const formatYear = (date) => {
    return new Date(date).getFullYear();
};

export const formatGenres = (genres) => {
    if (genres.length) {
        return genres.map((genre) => genre.name).join(", ");
    } else {
        return "No information";
    }
};

export const formatPremiere = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

export const displayIfEmpty = (number, formatFunc) => {
    return number ? formatFunc(number) : "No information";
};
