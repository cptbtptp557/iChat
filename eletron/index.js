const {app, BrowserWindow, Tray, nativeImage, ipcMain} = require("electron");
const path = require("path");

let win;
let win_child;
const createWin = () => {
    win = new BrowserWindow({
        width: 1000,
        height: 650,
        // frame: false, // 取消自带的边框栏
        // transparent: true,
        resizable: false,
        useContentSize: true,
        autoHideMenuBar: true,
        icon: 'public/image-32x32.ico',
        webPreferences: {
            sandbox: false,
            nodeIntegration: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js'),
        }
    });
    win.loadURL('http://localhost:5173/login').catch(console.error);
}

let tray;
app.whenReady()
    .then(() => {
        createWin();
        const icon = nativeImage.createFromPath("public/image-32x32.ico");
        tray = new Tray(icon);

        tray.setToolTip('electron托盘');

        ipcMain.on('openVoiceCallWindow', (event, title) => {
            // console.log(event);
            console.log(title);
            win_child = new BrowserWindow({
                width: 400,
                height: 650,
                useContentSize: true,
                autoHideMenuBar: true,
                parent: win,
                webPreferences: {
                    sandbox: false,
                    nodeIntegration: true,
                    contextIsolation: true,
                    preload: path.join(__dirname, 'preload.js'),
                }
            });
            win_child.loadURL('http://localhost:5173/voiceCallWindow').catch(console.error);
        })
    })

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
})

app.on("browser-window-focus", () => {
    console.log("获得焦点");
})

