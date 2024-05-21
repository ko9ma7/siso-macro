import ROUTER from '../../common/constants/Router';
import { BrowserWindow, dialog, ipcMain } from "electron";
import { join } from "path";
import sisoService from "./SisoService";
import userService from "./UserService";

class WindowService {
    private window: BrowserWindow;
    private readonly host = global.isDev ? "http://localhost:5173" : "./app/render/index.html";

    constructor() {
        sisoService.setBrowser();
        this.ipcListener();
    }

    getWindow = (): BrowserWindow => this.window;

    createWindow(options?: Electron.BrowserWindowConstructorOptions) {
        const oldWindow = this.window;
        this.window = new BrowserWindow({
            width: options?.width ?? 400,
            height: options?.height ?? 500,
            center: true,
            frame: false,
            resizable: false,
            maximizable: false, // 최대화 비활성화
            show: false,
            webPreferences: {
                preload: join(__dirname, '../preload.js'),
            },
        });
        if (oldWindow) oldWindow.close();

        this.window.once("ready-to-show", this.window.show);

        if (global.isDev) this.window.webContents.openDevTools({ mode: "detach" });
    }

    async loadWindow() {
        const route = ROUTER.LOGIN;

        if (global.isDev) {
            this.window.loadURL(`${this.host}/#${route}`);
        } else {
            this.window.loadFile(`${this.host}`, { hash: route });
        }

        // 메인 윈도우가 닫힐 때의 이벤트 핸들러
        this.window.on('closed', () => {
            // 메인 윈도우 참조 해제
            // this.window = null;
        });
    }

    setWindowSize(width: number, height: number) {
        this.window.setResizable(true);
        this.window.setSize(width, height);
        this.window.setResizable(false);
        this.window.center();
    }

    ipcListener() {
        ipcMain.on('window-close', () => this.window.close());
        ipcMain.on('window-minimize', () => this.window.minimize());
        ipcMain.on('window-size', (event, args) => this.setWindowSize(args.width, args.height));
        ipcMain.on('window-dialog', (event, args) => dialog.showErrorBox(args.title, args.text));

        ipcMain.handle('user-info', () => userService.storage.get());
        ipcMain.handle('login', (event, args) => userService.login(args));
        ipcMain.handle('logout', () => userService.logout());

        ipcMain.handle('siso-list', () => sisoService.list());
        ipcMain.handle('siso-list-refresh', () => sisoService.refreshList());
        ipcMain.handle('siso-create-book', (event, args) => sisoService.createBook(args));
        ipcMain.handle('siso-delete-book', (event, args) => sisoService.deleteBook(args));
        ipcMain.on('siso-run-book', (event, args) => sisoService.runBook(event, args));
        ipcMain.on('siso-stop-book', (event, args) => sisoService.stopBook(event, args));
        ipcMain.handle('siso-update-book', (event, args) => sisoService.updateBook(event, args));
        ipcMain.handle('siso-books', () => sisoService.getBooks());
    }
}

const windowService = new WindowService();
export default windowService;