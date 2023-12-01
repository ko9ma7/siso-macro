import { BrowserWindow, dialog, ipcMain } from "electron";
import { join } from "path";
import sisoService from "./SisoService";
import userService from "./UserService";

class WindowService {
    private win: BrowserWindow;
    private readonly host = "http://localhost:5173";

    constructor() {
        sisoService.setBrowser();
    }

    createWindow() {
        this.win = new BrowserWindow({
            width: 800,
            height: 600,
            frame: false,
            resizable: false,
            webPreferences: {
                preload: join(__dirname, '../preload.js'),
            }
        });
    }

    getWindow() {
        return this.win;
    }

    loadWindow() {
        this.win?.loadURL(`${this.host}/login`);
        this.ipcListener();

        // 메인 윈도우가 닫힐 때의 이벤트 핸들러
        this.win?.on('closed', () => {
            // 메인 윈도우 참조 해제
            this.win = null;
        });

        this.win?.webContents.openDevTools({ mode: "detach" });
    }

    ipcListener() {
        ipcMain.on('window-close', () => this.win?.close());
        ipcMain.on('windowdow-minimize', () => this.win?.minimize());
        ipcMain.on('login', userService.login);
    }
}

const windowService = new WindowService();
export default windowService;