import { app } from 'electron';
import WindowService from './services/WindowService';

app.whenReady().then(() => {
    const service = new WindowService();
    service.createWindow();
    service.loadWindow();
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})