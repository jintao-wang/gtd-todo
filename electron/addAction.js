const {
  app, BrowserWindow, globalShortcut, ipcMain,
} = require('electron');

function createAdd() {
  const win = new BrowserWindow({
    width: 500,
    height: 80,
    // transparent: true,
    frame: false,
    alwaysOnTop: true,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });

  win.loadURL(`${process.env.WINDOW_LOCARTION_ORIGIN}/add-action`).then((r) => console.log('load success!'));
  // win.webContents.openDevTools();
}

module.exports = {
  createAdd,
}
