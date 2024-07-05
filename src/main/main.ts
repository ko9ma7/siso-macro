import setGlobal from './global';
setGlobal();

import { app } from 'electron';
import windowService from './services/WindowService';
import sisoService from './services/SisoService';

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) app.quit();

app.whenReady().then(async () => {
    await sisoService.login();
    windowService.createWindow();
    windowService.loadWindow();
})

app.on('second-instance', () => {
    if (windowService.getWindow().isMinimized() || !windowService.getWindow().isVisible()) {
        windowService.getWindow().show();
    }
    windowService.getWindow().focus();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})