import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Statusbar from "../components/Statusbar";

const RootPage = () => {
    const [doRefresh, setDoRefresh] = useState(false)

    return (
        <div className="page">
            <Statusbar />
            <div className="h-[calc(100%-var(--statusbar-h))]">
                <Outlet context={{ doRefresh: doRefresh, setDoRefresh: setDoRefresh }} />
            </div>
        </div>
    );
};

export default RootPage;