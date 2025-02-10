import { app } from 'electron';
import windowService from './services/WindowService';

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
    app.quit();
} else {
    app.on('second-instance', () => {
        if (windowService.getWindow().isMinimized() || !windowService.getWindow().isVisible()) {
            windowService.getWindow().show();
        }
        windowService.getWindow().focus();
    });

    app.whenReady().then(async () => {
        windowService.createWindow();
        windowService.loadWindow();
    })

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    })
}