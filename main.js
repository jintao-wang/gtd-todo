const { app, BrowserWindow } = require('electron');

function createPostIt() {
  const win = new BrowserWindow({
    width: 400,
    height: 300,
    transparent: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadURL('http://localhost:3000/today').then((r) => console.log('load success!'));
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

  win.loadURL('http://localhost:3000').then((r) => console.log('load success!'));
  win.webContents.openDevTools();
}

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
