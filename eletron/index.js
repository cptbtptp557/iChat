const {app, BrowserWindow, Tray, ipcMain} = require("electron");
const path = require("path");
const window = require("./window");

const {
    mainWindow,
    audioWindow,
    videoWindow,
    watchVideo
} = window;

let front_end_url = "http://localhost:5173";

let win = null;
let audio_window = null;
let video_window = null;
let watch_video = null;

const createWin = () => {
    win = new BrowserWindow(mainWindow);
    win.loadURL(front_end_url + '/login').catch(console.error);
}

const createAudioWin = () => {
    audio_window = new BrowserWindow(audioWindow);
    audio_window.loadURL(front_end_url + '/voiceCallWindow').catch(console.error);
}

const createVideoWin = () => {
    video_window = new BrowserWindow(videoWindow);
    video_window.loadURL(front_end_url + '/videoCallWindow').catch(console.error);
}

const createWatchVideo = () => {
    watch_video = new BrowserWindow(watchVideo);
    watch_video.loadURL(front_end_url + '/watchVideoWindow').catch(console.error);
}

let tray;
app.whenReady()
    .then(() => {
        tray = new Tray(path.resolve(__dirname, '../public/image-32x32.ico'));
        tray.setToolTip('iChat');

        createWin();

        ipcMain.on('openVoiceCallWindow', () => {
            if (audio_window === null) createAudioWin();
        });

        ipcMain.on('openVideoWindow', () => {
            if (video_window === null) createVideoWin();
        });

        ipcMain.on('watchVideo', (event, title) => {
            if (watch_video === null) createWatchVideo();

            // console.log(title)
            setTimeout(() => {
                watch_video.webContents.send("videoLists", title);
            }, 1000);
        });

        ipcMain.on('closeWindow', (event, title) => {
            switch (title) {
                case "audio_window":
                    audio_window.close();
                    audio_window.on('closed', () => {
                        audio_window = null;
                    })
                    break;
                case "video_window":
                    video_window.close();
                    video_window.on('closed', () => {
                        video_window = null;
                    })
                    break;
                case "watch_video":
                    watch_video.close();
                    watch_video.on('closed', () => {
                        watch_video = null;
                    })
                    break;
            }
        })

        ipcMain.on('miniWindow', (event, title) => {
            if (title === "audio_window") audio_window.minimize();
            if (title === "video_window") video_window.minimize();
            if (title === "watch_video") watch_video.minimize();
        })

        ipcMain.on('maximizeWindow', (event, title) => {
            switch (title) {
                case "watch_video":
                    if (watch_video.isMaximized()) watch_video.unmaximize();
                    else watch_video.maximize();
                    break;
            }
        })

        ipcMain.on('receptionVoiceRoomName', (event, title) => {
            if (title) {
                setTimeout(() => {
                    audio_window.webContents.send("sendVoiceRoomName", title);
                }, 1000);
            } else {
                console.log("没收到")
            }
        })

        ipcMain.on('receptionVideoRoomName', (event, title) => {
            if (title) {
                setTimeout(() => {
                    video_window.webContents.send("sendVideoRoomName", title);
                }, 1000);
            } else {
                console.log("没收到")
            }
        })
    })

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
})

