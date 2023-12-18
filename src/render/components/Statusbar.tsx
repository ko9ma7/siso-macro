const Statusbar: React.FC = () => {
    const minimizeWindow = () => {
        window.electron.window.minimize();
    }

    const closeWindow = () => {
        window.electron.window.close();
    }

    return (
        <div id="status-bar" className="w-full h-[25px] flex justify-end">
            <div className="btn h-full text-white hover:bg-[#2c2c2c] focus:ring-4 focus:outline-none font-medium text-sm px-2 py-0.5 text-center"
                onClick={minimizeWindow}>
                ㅡ
            </div>
            <div className="btn h-full text-white hover:bg-red-500 focus:ring-4 focus:outline-none font-medium text-sm px-2 py-0.5 text-center"
                onClick={closeWindow}>
                ⨉
            </div>
        </div>
    );
}

export default Statusbar;