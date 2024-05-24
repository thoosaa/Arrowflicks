import { SideBar } from "../../widgets/sidebar";
import { MovieMain } from "../../widgets/moviemain/moviemain";

export function MoviesPage() {
    return (
        <div className="movies-page-layout">
            <SideBar />
            <MovieMain />
        </div>
    );
}
