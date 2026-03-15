const { app, BrowserWindow, ipcMain, session } = require('electron');
const path = require('path');
const WebOS = require('@webos/core');

const kernel = new WebOS(path.join(__dirname, 'accounts'));

function createOSWindow(username) {
    const user = kernel.setupUser(username);
    const userSession = session.fromPartition(user.partition);

    const win = new BrowserWindow({
        width: 1280, height: 800,
        webPreferences: {
            partition: user.partition,
            preload: path.join(__dirname, 'preload.js'),
            webviewTag: true // Vital for the Browser app
        }
    });

    win.loadFile('system/index.html');

    // Handle Chrome Extension support
    ipcMain.on('install-extension', async (e, extFolder) => {
        const extPath = path.join(user.path, 'extensions', extFolder);
        await userSession.loadExtension(extPath);
    });
}

ipcMain.handle('os:get-files', (e, user) => kernel.listUserFiles(user));

app.whenReady().then(() => createOSWindow('admin_user'));
