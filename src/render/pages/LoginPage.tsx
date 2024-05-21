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
                <div className="w-full p-5 justify-self-center">
                    <div className="pb-4">
                        <input type="text" id="id" name="id" ref={refInputId}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-60 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            placeholder="ID" required
                        />
                    </div>
                    <div className="pb-4">
                        <input type="password" id="pw" name="pw" ref={refInputPw}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-60 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Password" onKeyDown={handleOnKeyDownPw} required
                        />
                    </div>
                    <button className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        onClick={() => login()}>
                        LOGIN
                    </button>
                </div>
            </div>
        </>
    );
};

export default LoginPage;