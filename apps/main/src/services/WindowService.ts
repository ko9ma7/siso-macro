import { ROUTER } from '@repo/common/const';
import { app, BrowserWindow, dialog, ipcMain, shell } from "electron";
import { join } from "path";
import { sisoService } from "./SisoService";
import userService from "./UserService";

class WindowService {
    private window: BrowserWindow;
    private readonly host = !app.isPackaged ? "http://localhost:5173" : "./app/render/index.html";

    constructor() {
        this.ipcListener();
    }

    public getWindow = (): BrowserWindow => this.window;

    public createWindow() {
        const oldWindow = this.window;
        this.window = new BrowserWindow({
            minWidth: 640,
            width: 1280,
            maxWidth: 1280,
            minHeight: 480,
            height: 720,
            maxHeight: 720,
            center: true,
            frame: false,
            resizable: true,
            transparent: true,
            maximizable: false, // 최대화 비활성화
            show: false,
            webPreferences: {
                preload: join(__dirname, '../preload.js'),
            },
        });
        if (oldWindow) oldWindow.close();
        this.window.webContents.session.clearCache();

        // 새창열기 외부 브라우저로 실행
        this.window.webContents.setWindowOpenHandler((details) => {
            shell.openExternal(details.url);
            return { action: 'deny' };
        });

        this.window.once("ready-to-show", this.window.show);

        if (!app.isPackaged) this.window.webContents.openDevTools({ mode: "detach" });
    }

    async loadWindow(route: string = ROUTER.HOME) {
        await sisoService.setBrowser();

        if (!app.isPackaged) {
            this.window.loadURL(`${this.host}/#${route}`);
        } else {
            this.window.loadFile(`${this.host}`, { hash: route });
        }

        this.setWindowSize(1020, 680);

        this.window.webContents.on('did-finish-load', () => {
            const [width, height] = this.window.getSize();
            this.window.webContents.send('window.onGetSize', { width, height })
        })
    }

    setWindowSize(width: number, height: number) {
        this.window.setSize(width, height);
        this.window.center();
    }

    ipcListener() {
        ipcMain.on('window.load', (event, args) => this.loadWindow(args.route));
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