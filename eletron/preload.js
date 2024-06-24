const {contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    openVoiceCallWindow: () => {
        ipcRenderer.send('openVoiceCallWindow');
    },
    openVideoWindow: () => {
        ipcRenderer.send('openVideoWindow');
    },
    watchVideo: () => {
        ipcRenderer.send('watchVideo');
    },
    closeWindow: (window_name) => {
        ipcRenderer.send('closeWindow', window_name);
    },
    miniWindow: (window_name) => {
        ipcRenderer.send('miniWindow', window_name);
    }
})