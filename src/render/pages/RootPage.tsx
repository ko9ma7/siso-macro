import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const RootPage = () => {
    const [doRefresh, setDoRefresh] = useState(false)

    useEffect(() => {
        window.electron.window.size({ width: 1200, height: 900 });
    }, []);

    return (
        <>
            <Header />
            <div className="">
                <Outlet context={{ doRefresh: doRefresh, setDoRefresh: setDoRefresh }} />
            </div>
        </>
    );
};

export default RootPage;