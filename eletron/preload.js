const {contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    openVoiceCallWindow: () => {
        ipcRenderer.send('openVoiceCallWindow');
    },
    closeWindow: (window_name) => {
        ipcRenderer.send('closeWindow', window_name);
    },
    miniWindow: (window_name) => {
        ipcRenderer.send('miniWindow', window_name);
    }
})