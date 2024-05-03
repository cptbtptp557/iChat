const {join} = require("path");
const path = require("path");
const window = () => {
    const mainWindow = {
        width: 1000,
        height: 650,
        resizable: false,
        useContentSize: true,
        autoHideMenuBar: true,
        icon: 'public/image-32x32.ico',
        webPreferences: {
            sandbox: false,
            nodeIntegration: true,
            contextIsolation: true,
            preload: join(__dirname, 'preload.js'),
        }
    }

    const audioWindow = {
        width: 400,
        height: 700,
        frame: false,
        resizable: false,
        transparent: true,
        useContentSize: true,
        autoHideMenuBar: true,
        webPreferences: {
            sandbox: false,
            nodeIntegration: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js'),
        }
    }

    return {
        mainWindow,
        audioWindow,
    }
}

module.exports = window();