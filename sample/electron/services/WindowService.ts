import { BrowserWindow, ipcMain } from "electron";
import { join } from "path";
import SisoService from "./SisoService";

export default class WindowService {
    private sisoService: SisoService;
    private win: BrowserWindow;
    private readonly host = "http://localhost:5173";

    constructor() {
        this.sisoService = new SisoService();
        this.sisoService.setBrowser();
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
        ipcMain.on('close-window', () => {
            this.win?.close();
        });
        ipcMain.on('minimize-windowdow', () => {
            this.win?.minimize();
        });
        ipcMain.on('login', this.loginListener);
    }

    private loginListener(event, arg) {
        event.sender.send('login-res', { status: false });
    }
}