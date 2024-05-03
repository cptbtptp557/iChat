const {contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    openVoiceCallWindow: (title) => {
        ipcRenderer.send('openVoiceCallWindow', title);
    },
    closeVoice: () => {
        ipcRenderer.send('closeVoice');
    },
    miniVoice: () => {
        ipcRenderer.send('miniVoice');
    }
})