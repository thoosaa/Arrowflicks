import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MoviesPage } from "./pages/movies/movies";
import { RatedPage } from "./pages/rated/index";
import { MoviePage } from "./pages/movie/movie";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MoviesPage />} />
                <Route path="/movies" element={<MoviesPage />} />
                <Route path="/rated" element={<RatedPage />} />
                <Route path="/movies/:movie_id" element={<MoviePage />} />
                {
                    //<Route path="*" element={<Page404/>}
                }
            </Routes>
        </BrowserRouter>
    );
}

export default App;
