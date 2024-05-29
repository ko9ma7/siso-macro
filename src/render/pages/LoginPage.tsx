import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ROUTER from "../../common/constants/Router";
import useLoaderStore from "../store/useLoaderStore";
import icoHide from "@assets/images/user/ico_hide.png";
import icoShow from "@assets/images/user/ico_show.png";

const LoginPage = () => {
    const setIsLoad = useLoaderStore((state) => state.setIsLoad);
    const [showPass, setShowPass] = useState<boolean>(false);
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
                    <div className="w-[240px] bg-[#F2F3F6] border border-transparent focus-within:border-[#D0D0D0] shadow-lg flex items-center rounded-[8px] mb-4">
                        <input ref={refInputId} type="text" name="id" placeholder="ID" required
                            className="bg-transparent rounded-lg w-60 p-2.5" />
                    </div>
                    <div className="w-[240px] bg-[#F2F3F6] border border-transparent focus-within:border-[#D0D0D0] shadow-lg flex items-center rounded-[8px] mb-4 pr-2.5">
                        <input ref={refInputPw} type={showPass ? "text" : "password"} name="pw" placeholder="Password" onKeyDown={handleOnKeyDownPw} required
                            className="bg-transparent rounded-lg w-60 p-2.5"  />
                        <img width={20} src={showPass ? icoHide : icoShow} className="cursor-pointer" onClick={() => setShowPass((visible) => !visible)} />
                    </div>
                    <button className="text-[12px] px-4 py-2 rounded-[8px]" onClick={() => login()}>
                        Login
                    </button>
                </div>
            </div>
        </>
    );
};

export default LoginPage;