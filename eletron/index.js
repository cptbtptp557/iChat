const {app, BrowserWindow, Tray, nativeImage, ipcMain} = require("electron");
const window = require("./window");

const {mainWindow, audioWindow} = window;

let win;
let audio_window;
const createWin = () => {
    win = new BrowserWindow(mainWindow);
    win.loadURL('http://localhost:5173/login').catch(console.error);
}

const createAudioWin = () => {
    audio_window = new BrowserWindow(audioWindow);
    audio_window.loadURL('http://localhost:5173/voiceCallWindow').catch(console.error);
}

let tray;
app.whenReady()
    .then(() => {
        const icon = nativeImage.createFromPath("public/image-32x32.ico");
        tray = new Tray(icon);
        tray.setToolTip('electron托盘');

        createWin();

        ipcMain.on('openVoiceCallWindow', () => {
            createAudioWin();
        });

        ipcMain.on('closeWindow', (event, title) => {
            if (title === "audio_window") {
                audio_window.close();
            }
            //else if (title)
        })
        ipcMain.on('miniWindow', (event, title) => {
            if (title === "audio_window") {
                audio_window.minimize();
            }
        })
    })

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
})

