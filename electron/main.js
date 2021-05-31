const {
  app, BrowserWindow, globalShortcut, ipcMain,
} = require('electron');
const dotenv = require('dotenv');
const { createAdd } = require('./addAction');
const { createPostIt } = require('./postIt');

dotenv.config();

function createHome() {
  const win = new BrowserWindow({
    width: 1000,
    height: 600,
    titleBarStyle: 'hiddenInset',
    // transparent: true,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true, // 该选项启用Node API，可以在页面中使用node中的require方法
      // 由于安全问题，remote模块默认关闭
      enableRemoteModule: true, // 开启remote模块
    },
  });

  win.loadURL(process.env.WINDOW_LOCARTION_ORIGIN).then((r) => console.log('load success!'));
  win.webContents.openDevTools();

  // create window of createAdd
  globalShortcut.register('Control+Enter', () => {
    createAdd();
  });

  // create window of postIt
  ipcMain.on('createPostIt', (event, message) => {
    if (message) {
      createPostIt();
    }
  });
}
app.disableHardwareAcceleration();
app.whenReady().then(createHome);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
