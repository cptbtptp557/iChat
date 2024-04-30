const {contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    openVoiceCallWindow: (title) => {
        ipcRenderer.send('openVoiceCallWindow', title);
    },
    mouseCoordinates: (x, y) => {
        console.log(x)
        console.log(y)
        ipcRenderer.send('drag-start', {x, y});
    }

})