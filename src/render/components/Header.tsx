import { Link, useNavigate, useLocation } from "react-router-dom";
import ROUTER from "../../common/constants/Router";

const Header = () => {
    const routes = [{ to: ROUTER.HOME, menu: '예약' }, { to: ROUTER.LIST, menu: '목록' }]
    const navigate = useNavigate();
    const location = useLocation();

    const logout = async () => {
        const res = await window.electron.user.logout();

        if (res) {
            navigate(ROUTER.LOGIN, { replace: true });
            window.electron.window.size({ width: 400, height: 500 });
        } else {
            window.electron.window.dialog({ title: 'Error', text: '로그아웃에 실패했습니다. 지속시 관리자에게 문의해주세요.' });
        }
    }

    return (
        <header className="w-full h-[100px] bg-[#FFFFFF] border-b border-[#D0D5DD]">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <div className="cursor-pointer flex">
                    {
                        ...routes.map((route) => {
                            const isSelected = location.pathname === route.to ? 'text-black' : 'text-gray-400';
                            return <Link className={`cursor-pointer rounded-[10px] mr-2 p-2 ${isSelected} hover:text-gray-600 `} to={route.to}>{route.menu}</Link>
                        })
                    }
                </div>
                <button className="cursor-pointer flex" onClick={logout}>
                    로그아웃
                </button>
            </nav>
        </header>
    );
}

export default Header;