import { RatedMain } from "../../widgets/ratedmain";
import { SideBar } from "../../widgets/sidebar";

export function RatedPage() {
    return (
        <div className="rated-page-layout">
            <SideBar />
            <RatedMain />
        </div>
    );
}
