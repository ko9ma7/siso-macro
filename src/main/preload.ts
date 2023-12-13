import { ipcRenderer, contextBridge } from 'electron';

contextBridge.exposeInMainWorld('electron', {
    window: {
        minimize: () => ipcRenderer.send('window-minimize'),
        close: () => ipcRenderer.send('window-close'),
        size: (args) => ipcRenderer.send('window-size', args),
        dialog: (args) => ipcRenderer.send('window-dialog', args),
    },
    user: {
        info: () => ipcRenderer.invoke('user-info'),
        login: (args) => ipcRenderer.invoke('login', args),
        logout: (args) => ipcRenderer.invoke('logout', args),
    },
    siso: {
        list: () => ipcRenderer.invoke('siso-list'),
        refreshList: () => ipcRenderer.invoke('siso-list-refresh'),
        createBook: (args) => ipcRenderer.invoke('siso-create-book', args),
        runBook: (args) => ipcRenderer.invoke('siso-run-book', args),
        getBooks: () => ipcRenderer.invoke('siso-books'),
    }
});