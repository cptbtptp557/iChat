const {contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    ipcRenderer,

    openVoiceCallWindow: () => {
        ipcRenderer.send('openVoiceCallWindow');
    },
    openVideoWindow: () => {
        ipcRenderer.send('openVideoWindow');
    },
    watchVideo: (videoName, videoSrc) => {
        ipcRenderer.send('watchVideo', {videoName, videoSrc});
    },
    closeWindow: (window_name) => {
        ipcRenderer.send('closeWindow', window_name);
    },
    miniWindow: (window_name) => {
        ipcRenderer.send('miniWindow', window_name);
    },
    maximizeWindow: (window_name) => {
        ipcRenderer.send('maximizeWindow', window_name);
    },
    sendVideoLists: (video_lists) => ipcRenderer.on('videoLists', video_lists),
});