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

  win.loadURL('https://gtd-todo.vercel.app/add-action').then((r) => console.log('load success!'));
  // win.loadURL('http://localhost:3000/add-action').then((r) => console.log('load success!'));
  // win.webContents.openDevTools();
}

function createHome() {
  const win = new BrowserWindow({
    width: 1000,
    height: 600,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true, // 该选项启用Node API，可以在页面中使用node中的require方法
      // 由于安全问题，remote模块默认关闭
      enableRemoteModule: true, // 开启remote模块
    },
  });

  win.loadURL('https://gtd-todo.vercel.app').then((r) => console.log('load success!'));
  // win.loadURL('http://localhost:3000').then((r) => console.log('load success!'));
  // win.webContents.openDevTools();

  globalShortcut.register('Control+Enter', () => {
    createAdd();
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
