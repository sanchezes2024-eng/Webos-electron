const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    user: 'admin_user',
    getFiles: (user) => ipcRenderer.invoke('os:get-files', user),
    installExt: (name) => ipcRenderer.send('install-extension', name)
});
