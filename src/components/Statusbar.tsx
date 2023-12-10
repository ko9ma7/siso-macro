const Statusbar: React.FC = () => {
    const minimizeWindow = () => {
        window.electron.window.minimize();
    }

    const closeWindow = () => {
        window.electron.window.close();
    }

    return (
        <div id="status-bar" className="w-full h-[3vh] flex justify-end">
            <div className="btn w-[30px] h-full text-white hover:bg-[#2c2c2c] focus:ring-4 focus:outline-none font-medium text-sm p-1.5 text-center"
                onClick={minimizeWindow}>
                ㅡ
            </div>
            <div className="btn w-[30px] h-full text-white hover:bg-red-500 focus:ring-4 focus:outline-none font-medium text-sm p-1.5 text-center"
                onClick={closeWindow}>
                ⨉
            </div>
        </div>
    );
}

export default Statusbar;