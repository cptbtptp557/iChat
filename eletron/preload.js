const {contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    openVoiceCallWindow: (title) => {
        console.log(title);
        ipcRenderer.send('openVoiceCallWindow', title);
    },
})