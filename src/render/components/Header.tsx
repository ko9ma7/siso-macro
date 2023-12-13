import { Link, useNavigate, useLocation } from "react-router-dom";

const Header = () => {
    const routes = [{ to: '/home', menu: '예약' }, { to: '/list', menu: '목록' }]
    const navigate = useNavigate();
    const location = useLocation();

    const logout = async () => {
        const res = await window.electron.user.logout();

        if (res) {
            navigate("/login", { replace: true });
            window.electron.window.size({ width: 800, height: 600 });
        } else {
            window.electron.window.dialog({ title: '로그아웃 실패', text: '로그아웃에 실패했습니다. 지속시 관리자에게 문의해주세요.' });
        }
    }

    return (
        <header className="bg-slate-800 w-full h-[100px]">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <div className="cursor-pointer flex">
                    {
                        ...routes.map((route) => {
                            const isSelected = location.pathname === route.to ? 'text-gray-400' : 'text-white';
                            return <Link className={`cursor-pointer rounded-[10px] mr-2 p-2 ${isSelected} hover:text-gray-400 `} to={route.to}>{route.menu}</Link>
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