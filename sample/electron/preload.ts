import { ipcRenderer, contextBridge } from 'electron';

contextBridge.exposeInMainWorld('electron', {
    window: {
        minimize: () => ipcRenderer.send('window-minimize'),
        close: () => ipcRenderer.send('window-close'),
    },
    user: {
        login: (args) => ipcRenderer.send('login', args),
        loginReply: (callback) => ipcRenderer.on('login-reply', callback),
    },
});