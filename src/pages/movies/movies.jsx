import { SideBar } from "../../widgets/sidebar";
import { MovieMain } from "../../widgets/moviemain/moviemain";

export function MoviesPage() {
    return (
        <div className="main">
            <SideBar />
            <MovieMain title="Movies" />
        </div>
    );
}
