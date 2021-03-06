"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var LoginChannel_1 = require("./LoginChannel");
var isDev = require('electron-is-dev');
var path = require('path');
var Main = /** @class */ (function () {
    function Main() {
    }
    Main.prototype.init = function (ipcChannels) {
        electron_1.app.on('ready', this.createWindow);
        electron_1.app.on('window-all-closed', this.onWindowAllClosed);
        electron_1.app.on('activate', this.onActivate);
        this.registerIpcChannels(ipcChannels);
        //允许使用file协议
        //todo
        // protocol.registerFileProtocol('file', (request, callback) => {
        //   const pathname = decodeURI(request.url.replace('file:///', ''));
        //   callback(pathname);
        // });
        //设置环境变量为当前安装目录
        var exec = require('child_process').exec;
        var sysPath = "" + __dirname;
        var index = sysPath.lastIndexOf("\\");
        sysPath = sysPath.substring(0, index);
        if (!isDev) {
            sysPath = sysPath.replace("resources\\app.asar\\build\\", "");
        }
        exec("set Path \"%Path%;" + sysPath + "\"", {});
    };
    Main.prototype.onWindowAllClosed = function () {
        if (process.platform !== 'darwin') {
            electron_1.app.quit();
        }
    };
    Main.prototype.onActivate = function () {
        if (!this.mainWindow) {
            this.createWindow();
        }
    };
    Main.prototype.createWindow = function () {
        this.mainWindow = new electron_1.BrowserWindow({
            width: 1440,
            height: 800,
            backgroundColor: 'white',
            minWidth: 1440,
            minHeight: 800,
            webPreferences: {
                nodeIntegration: true,
                webSecurity: false
            }
        });
        // Open the DevTools.
        if (isDev) {
            this.mainWindow.webContents.openDevTools();
        }
        else {
            this.mainWindow.setMenu(null);
        }
        var urlLocation = isDev
            ? 'http://localhost:3000'
            : "file://" + path.join(__dirname, './index.html');
        this.mainWindow.loadURL(urlLocation);
    };
    Main.prototype.registerIpcChannels = function (ipcChannels) {
        ipcChannels.forEach(function (channel) { return electron_1.ipcMain.on(channel.getName(), function (event, request) { return channel.handle(event, request); }); });
    };
    return Main;
}());
(new Main()).init([
    new LoginChannel_1.LoginChannel()
]);
