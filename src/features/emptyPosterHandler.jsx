export function showCorrectPicture(poster_path, width, height) {
    if (poster_path) {
        return (
            <img
                src={"http://image.tmdb.org/t/p/w500" + poster_path}
                width={width}
                height={height}
            />
        );
    } else {
        return (
            <div
                style={{
                    width: width,
                    height: height,
                    backgroundColor: "#EAEBED",
                }}
            ></div>
        );
    }
}
