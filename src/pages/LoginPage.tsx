import { useEffect, useRef, useState } from "react";
import Loading from "../components/Loading";

const LoginPage: React.FC = () => {
    const refInputId = useRef();
    const refInputPw = useRef();
    const refLoginBtn = useRef();
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
    const handleInputId = (e) => setInputId(e.target.value)
    const handleInputPw = (e) => setInputPw(e.target.value)
    const handleOnKeyDownPw = (e) => {
        if (e.key === 'Enter') refLoginBtn.current.click();
    }

    const login = async (e) => {
        setIsLoading(true);
        const res = await window.electron.user.login({ id: inputId, pw: inputPw });
        setIsLoading(false);

        if (res.status) {
            location.href = "/home";
        } else {
            window.electron.window.dialog({ title: '로그인 실패', text: '아이디 또는 패스워드를 확인해주세요' });
        }
    }

    const closeWindow = () => {
        window.electron.window.close();
    }

    return (
        <div className="w-[800px] h-[600px] flex items-center justify-center">
            {isLoading && <Loading />}
            <div className="p-5 ">
                <div className="pb-4">
                    <input type="text" id="id" name="id" ref={refInputId}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-60 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="ID" value={inputId} onChange={handleInputId} required
                    />
                </div>
                <div className="pb-4">
                    <input type="password" id="pw" name="pw" ref={refInputPw}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-60 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Password" value={inputPw} onChange={handleInputPw} onKeyDown={handleOnKeyDownPw} required
                    />
                </div>
                <div>
                    <button type="button" ref={refLoginBtn} className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        onClick={login}>
                        Login
                    </button>
                    <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        onClick={closeWindow}>
                        Quit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;