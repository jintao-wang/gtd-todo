const {
  app, BrowserWindow, globalShortcut, ipcMain,
} = require('electron');

function createPostIt() {
  let win = new BrowserWindow({
    width: 400,
    height: 300,
    transparent: true,
    frame: false,
    roundedCorners: false,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });

  win.loadURL(`${process.env.WINDOW_LOCARTION_ORIGIN}/today`).then((r) => console.log('load success!'));
  // win.webContents.openDevTools();
  globalShortcut.register('Command+1', () => {
    win.setAlwaysOnTop(true);
    win.show();
  });

  ipcMain.on('addActionMain', (event, message) => {
    win.webContents.send('addActionFromMain', message);
  });
  ipcMain.on('addWindowHeight', (event, message) => {
    const newHeight = 300 + message;
    win.setBounds({ height: newHeight });
  });
  win.on('blur', () => {
    win.setAlwaysOnTop(false);
  });
  win.on('close', () => {
    win = null;
  });
}

module.exports = {
  createPostIt,
};
