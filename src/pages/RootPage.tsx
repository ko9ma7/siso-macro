import { useState } from "react";
import { Outlet } from "react-router-dom";
import Statusbar from "../components/Statusbar";
import Header from "../components/Header";

const RootPage: React.FC = () => {
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')

    // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
    const handleInputId = (e) => {
        setInputId(e.target.value)
    }

    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }

    // login 버튼 클릭 이벤트
    const onClickLogin = () => {
        console.log('click login')
    }

    return (
        <>
            <div className="w-[1200px] h-[900px] font-tenada">
                <Statusbar />
                <Header />
                <div id="layout-content" className="bg-[url('/images/kangin.jpg')] bg-no-repeat bg-contain bg-center opacity-30">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default RootPage;