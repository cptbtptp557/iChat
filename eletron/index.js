const {app, BrowserWindow, Tray, nativeImage, ipcMain} = require("electron");
const window = require("./window");

const {mainWindow, audioWindow, videoWindow} = window;

let win = null;
let audio_window = null;
let video_window = null;

const createWin = () => {
    win = new BrowserWindow(mainWindow);
    win.loadURL('http://localhost:5173/login').catch(console.error);
}

const createAudioWin = () => {
    audio_window = new BrowserWindow(audioWindow);
    audio_window.loadURL('http://localhost:5173/voiceCallWindow').catch(console.error);
}

const createVideoWin = () => {
    video_window = new BrowserWindow(videoWindow);
    video_window.loadURL('http://localhost:5173/videoCallWindow').catch(console.error);
}

let tray;
app.whenReady()
    .then(() => {
        const icon = nativeImage.createFromPath("public/image-32x32.ico");
        tray = new Tray(icon);
        tray.setToolTip('electron托盘');

        createWin();

        ipcMain.on('openVoiceCallWindow', () => {
            if (audio_window === null) createAudioWin();
        });
        ipcMain.on('openVideoWindow', () => {
            if (video_window === null) createVideoWin();
        });

        ipcMain.on('closeWindow', (event, title) => {
            if (title === "audio_window") {
                audio_window.close();
                audio_window.on('closed', () => {
                    audio_window = null;
                })
            }
            if (title === "video_window") {
                video_window.close();
                video_window.on('closed', () => {
                    video_window = null;
                })
            }
        })
        ipcMain.on('miniWindow', (event, title) => {
            if (title === "audio_window") {
                audio_window.minimize();
            }
            if (title === "video_window") {
                video_window.minimize();
            }
        })
    })

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
})

