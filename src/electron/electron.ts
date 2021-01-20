import { app, BrowserWindow, ipcMain, protocol } from 'electron';
import { IIpcChannel } from './shared/IIpcChannel';
const isDev = require('electron-is-dev');
const path = require('path');



class Main {
  private mainWindow: BrowserWindow | undefined;

  public init(ipcChannels: IIpcChannel[]) {
    app.on('ready', this.createWindow);
    app.on('window-all-closed', this.onWindowAllClosed);
    app.on('activate', this.onActivate);

    this.registerIpcChannels(ipcChannels);

    //允许使用file协议
    protocol.registerFileProtocol('file', (request, callback) => {
      const pathname = decodeURI(request.url.replace('file:///', ''));
      callback(pathname);
    });

    //设置环境变量为当前安装目录
    const exec = require('child_process').exec;
    let sysPath = `${__dirname}`;
    let index = sysPath.lastIndexOf("\\");
    sysPath = sysPath.substring(0, index);
    if (!isDev) {
      sysPath = sysPath.replace("resources\\app.asar\\build\\", "");
    }
    exec(`set Path "%Path%;${sysPath}"`, {});
  }

  private onWindowAllClosed() {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  }

  private onActivate() {
    if (!this.mainWindow) {
      this.createWindow();
    }
  }

  private createWindow() {
    this.mainWindow = new BrowserWindow({
      width: 1440,
      height: 800,
      backgroundColor: 'white',
      minWidth: 1440,
      minHeight: 800,
      webPreferences: {
        nodeIntegration: true,
        webSecurity: false,
      },
    });

    // Open the DevTools.
    if (isDev) {
      this.mainWindow.webContents.openDevTools();
    } else {
      this.mainWindow.setMenu(null);
    }

    const urlLocation = isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, './index.html')}`;

    this.mainWindow.loadURL(urlLocation);
  }

  private registerIpcChannels(ipcChannels: IIpcChannel[]) {
    ipcChannels.forEach(channel => ipcMain.on(channel.getName(), (event, request) => channel.handle(event, request)));
  }
}


(new Main()).init([

]);
