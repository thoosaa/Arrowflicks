import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { MoviesPage } from "./pages/movies/movies";
import { RatedPage } from "./pages/rated/index";
import { MoviePage } from "./pages/movie/movie";
import { useEffect } from "react";

function App() {
    /*const location = useLocation();

    useEffect(() => {
        function scalePage() {
            const designWidth = 1440; // Design width
            const scaleX = window.innerWidth / designWidth;
            const scale = scaleX;

            const content =
                document.querySelector(".moviesPageLayout") ||
                document.querySelector(".moviePageLayout") ||
                document.querySelector(".ratedPageLayout");
            if (content) {
                content.style.width = `${window.innerWidth}px`;
                //console.log(content.offsetHeight);

                content.style.transform = `scale(${scaleX})`;
                content.style.transformOrigin = "top center";
            }
        }

        // Initial scale
        scalePage();

        // Add event listener for resize
        window.addEventListener("resize", scalePage);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener("resize", scalePage);
        };
    }, [location]);*/

    return (
        <Routes>
            <Route path="/" element={<MoviesPage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/rated" element={<RatedPage />} />
            <Route path="/movies/:movie_id" element={<MoviePage />} />
            {
                //<Route path="*" element={<Page404/>}
            }
        </Routes>
    );
}

export default App;
