import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ROUTER from "../../common/constants/Router";
import useLoaderStore from "../store/useLoaderStore";

const LoginPage = () => {
    const setIsLoad = useLoaderStore((state) => state.setIsLoad);
    const refInputId = useRef<HTMLInputElement>();
    const refInputPw = useRef<HTMLInputElement>();
    const navigate = useNavigate();

    useEffect(() => {
        window.electron.window.size({ width: 400, height: 500 });
        setUserInfo();
    }, []);

    const setUserInfo = async () => {
        const userInfo = await window.electron.user.info();

        refInputId.current.value = userInfo?.id ?? '';
        refInputPw.current.value = userInfo?.pw ?? '';
    }

    const handleOnKeyDownPw = (e) => {
        if (e.key === 'Enter') login();
    }

    const login = async () => {
        setIsLoad(true);
        const res = await window.electron.user.login({ id: refInputId.current.value, pw: refInputPw.current.value });
        setIsLoad(false);

        if (res) {
            navigate('/home');
            navigate(ROUTER.HOME, { replace: true });
        } else {
            window.electron.window.dialog({ title: 'Error', text: '아이디 또는 패스워드를 확인해주세요' });
        }
    }

    return (
        <>
            <div className="page flex items-center justify-between overflow-hidden">
                <div className="w-full p-5 flex flex-col items-center">
                    <div className="pb-4">
                        <input type="text" name="id" ref={refInputId} className="bg-[#F2F3F6] focus:outline-[#D0D0D0] rounded-lg w-60 p-2.5" placeholder="ID" required />
                    </div>
                    <div className="pb-4">
                        <input type="text" name="pw" ref={refInputPw} className="bg-[#F2F3F6] focus:outline-[#D0D0D0] rounded-lg w-60 p-2.5" placeholder="Password" onKeyDown={handleOnKeyDownPw} required />
                    </div>
                    <button className="bg-[#F2F3F6] py-2.5 px-5 me-2 mb-2 text-sm font-medium hover:border-0 focus:outline-[#D0D0D0] rounded-full hover:bg-gray-100"
                        onClick={() => login()}>
                        LOGIN
                    </button>
                </div>
            </div>
        </>
    );
};

export default LoginPage;