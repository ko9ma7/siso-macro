import { useState } from "react";

const HomePage: React.FC = () => {
    const onclick = () => {
        window.ipcRenderer.send('start-cralwer');
    }

    return (
        <>
            <button onClick={onclick}>Start</button>
        </>
    );
};

export default HomePage;