const Statusbar: React.FC = () => {
    const minimizeWindow = () => {
        window.electron.window.minimize();
    }

    const closeWindow = () => {
        window.electron.window.close();
    }

    return (
        <div id="status-bar" className="bg-slate-600 w-full h-6">
            <div id="close-btn" className="h-full float-right text-white hover:bg-red-500 focus:ring-4 focus:outline-none font-medium text-sm p-1.5 text-center inline-flex items-center"
                onClick={closeWindow}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                </svg>
            </div>
            <div id="close-btn" className="h-full float-right text-white hover:bg-[#2c2c2c] focus:ring-4 focus:outline-none font-medium text-sm p-1.5 text-center inline-flex items-center"
                onClick={minimizeWindow}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash-lg" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8" />
                </svg>
            </div>
        </div>
    );
}

export default Statusbar;