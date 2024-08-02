import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Statusbar from "../components/Statusbar";

const RootPage = () => {
    const [doRefresh, setDoRefresh] = useState(false)

    return (
        <div className="root">
            <Statusbar />
            <div className="page">
                <Outlet context={{ doRefresh: doRefresh, setDoRefresh: setDoRefresh }} />
            </div>
        </div>
    );
};

export default RootPage;