import closeIco from "@assets/images/ico_close.png";
import miniIco from "@assets/images/ico_mini.png";

const Statusbar: React.FC = () => {
    const minimizeWindow = () => {
        window.electron.window.minimize();
    }

    const closeWindow = () => {
        window.electron.window.close();
    }

    return (
        <div className="statusbar flex justify-between items-center">
            <span className="text-[9px] font-medium ml-[4px]">Siso-Auto-Booking</span>
            <div className="flex justify-end">
                <img src={miniIco} className="btn hover:text-[#FFFFFF] hover:bg-[#D0D5DD]" onClick={minimizeWindow} />
                <img src={closeIco} className="btn rounded-tr-[8px] hover:text-[#FFFFFF] hover:bg-[#D0D5DD]" onClick={closeWindow} />
            </div>
        </div>
    );
}

export default Statusbar;