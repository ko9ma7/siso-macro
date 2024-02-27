import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ROUTER from "../../common/constants/Router";
import sonImg from "@assets/images/son.jpg";

const LoginPage = () => {
    const refInputId = useRef<HTMLInputElement>();
    const refInputPw = useRef<HTMLInputElement>();
    const refLoginBtn = useRef<HTMLButtonElement>();
    const navigate = useNavigate();

    useEffect(() => {
        setUserInfo();
    }, []);

    const setUserInfo = async () => {
        const userInfo = await window.electron.user.info();

        refInputId.current.value = userInfo?.id ?? '';
        refInputPw.current.value = userInfo?.pw ?? '';
    }

    const handleOnKeyDownPw = (e) => {
        if (e.key === 'Enter') refLoginBtn.current.click();
    }

    const login = async (e) => {
        refLoginBtn.current.disabled = true;
        const res = await window.electron.user.login({ id: refInputId.current.value, pw: refInputPw.current.value });
        refLoginBtn.current.disabled = false;

        if (res) {
            navigate(ROUTER.HOME, { replace: true });
            window.electron.window.size({ width: 1200, height: 900 });
        } else {
            window.electron.window.dialog({ title: 'Error', text: '아이디 또는 패스워드를 확인해주세요' });
        }
    }

    return (
        <>
            <div className="h-[575px] flex items-center justify-between">
                <img className="h-full opacity-30" src={sonImg} />
                <div className="w-full p-5 justify-self-center">
                    <div className="pb-4">
                        <input type="text" id="id" name="id" ref={refInputId}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-60 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="ID" required
                        />
                    </div>
                    <div className="pb-4">
                        <input type="password" id="pw" name="pw" ref={refInputPw}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-60 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Password" onKeyDown={handleOnKeyDownPw} required
                        />
                    </div>
                    <div>
                        <button type="button" ref={refLoginBtn} className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            onClick={login}>
                            LOGIN
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;