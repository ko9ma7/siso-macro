import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const RootPage = () => {
    const [doRefresh, setDoRefresh] = useState(false)

    return (
        <>
            <Header />
            <div id="layout-content" className="bg-[url('/images/kangin_.jpg')] bg-no-repeat bg-contain bg-center">
                <Outlet context={{ doRefresh: doRefresh, setDoRefresh: setDoRefresh }} />
            </div>
        </>
    );
};

export default RootPage;