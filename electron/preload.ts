import { ipcRenderer, contextBridge } from 'electron';

contextBridge.exposeInMainWorld('electron', {
    window: {
        minimize: () => ipcRenderer.send('window-minimize'),
        close: () => ipcRenderer.send('window-close'),
        dialog: (args) => ipcRenderer.send('window-dialog', args),
    },
    user: {
        login: (args) => ipcRenderer.invoke('login', args),
        logout: (args) => ipcRenderer.invoke('logout', args),
    },
});