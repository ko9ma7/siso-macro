import setGlobal from './global';
setGlobal();

import { app } from 'electron';
import windowService from './services/WindowService';

app.whenReady().then(() => {
    windowService.createWindow();
    windowService.loadWindow();
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})