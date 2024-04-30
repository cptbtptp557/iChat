const {contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    openVoiceCallWindow: (title) => {
        ipcRenderer.send('openVoiceCallWindow', title);
    },
})