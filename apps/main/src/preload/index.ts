import { ipcRenderer, contextBridge } from 'electron';

contextBridge.exposeInMainWorld('electron', {
    window: {
        load: (args) => ipcRenderer.send('window.load', args),
        minimize: () => ipcRenderer.send('window-minimize'),
        close: () => ipcRenderer.send('window-close'),
        onGetSize: (callback) => ipcRenderer.on("window.onGetSize", (evt, data) => callback(data)),
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
        deleteBook: (args) => ipcRenderer.invoke('siso-delete-book', args),
        runBook: (args) => ipcRenderer.send('siso-run-book', args),
        stopBook: (args) => ipcRenderer.send('siso-stop-book', args),
        getBooks: () => ipcRenderer.invoke('siso-books'),
        updateBook: (args) => ipcRenderer.invoke('siso-update-book', args),
        onUpdateBooks: (callback) => ipcRenderer.on('update-books', (_event, books) => callback(books)),
    }
});