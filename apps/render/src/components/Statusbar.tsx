import closeIco from "@/assets/images/ico_close.png";
import miniIco from "@/assets/images/ico_mini.png";

const Statusbar: React.FC = () => {
    const minimizeWindow = () => {
        window.electron.window.minimize();
    }

    const closeWindow = () => {
        window.electron.window.close();
    }

    return (
        <div className="statusbar flex justify-between items-center">
            <div className="w-full h-full flex justify-end">
                <img
                    className="btn rounded-full hover:text-[#FFFFFF] hover:bg-[#ffffff] mr-1"
                    src={miniIco}
                    onClick={minimizeWindow}
                />
                <img
                    className="btn rounded-full hover:text-[#FFFFFF] hover:bg-[#ffffff] mr-1"
                    src={closeIco}
                    onClick={closeWindow}
                />
            </div>
        </div>
    );
}

export default Statusbar;