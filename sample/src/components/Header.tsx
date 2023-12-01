const Header: React.FC = () => {
    const move = (route: string) => {
        location.href = route;
    }

    return (
        <header className="bg-slate-800">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <div className="cursor-pointer flex">
                    <button className="cursor-pointer mr-2" onClick={() => move('/home')}>
                        HOME
                    </button>
                    <button className="cursor-pointer mr-2" onClick={() => move('/list')}>
                        LIST
                    </button>
                </div>
                <button className="cursor-pointer flex" onClick={() => move('/login')}>
                    logout
                </button>
            </nav>
        </header>
    );
}

export default Header;