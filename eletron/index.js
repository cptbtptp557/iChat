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
                frame: false,
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
            // 假设你的自定义拖动区域是一个拥有 class="draggable-area" 的元素
            let dragging = false;
            let currentPos = {x: 0, y: 0};
            let initialPos = {x: 0, y: 0};

            win_child.webContents.on('dom-ready', () => {
                win_child.webContents.executeJavaScript(`  
      const draggableArea = document.getElementById("a");  
      draggableArea?.addEventListener('mousedown', (e) => {  
        const { screenX, screenY } = e;  
        window.electronAPI.mouseCoordinates(screenX, screenY);
      });  
    `);

                ipcMain.on('drag-start', (event, position) => {
                    dragging = true;
                    currentPos = position;
                    console.log(position)
                    initialPos = win_child.getPosition();
                });

                win_child.on('mousemove', (e) => {
                    if (dragging) {
                        const {x, y} = e;
                        const newX = initialPos[0] + (x - currentPos.x);
                        const newY = initialPos[1] + (y - currentPos.y);
                        win_child.setPosition(newX, newY);
                    }
                });

                win_child.on('mouseup', () => {
                    dragging = false;
                });

                // 还可以添加 'mouseleave' 事件处理来确保在鼠标离开窗口时停止拖动
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

