import { useState } from "react";

const HomePage: React.FC = () => {
    const onclick = () => {
        window.ipcRenderer.send('start-cralwer');
    }

    return (
        <div className="">
            자동으로 예약 프로그램이 실행중...
        </div>
    );
};

export default HomePage;