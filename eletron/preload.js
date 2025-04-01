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
    sendVoiceRoomName: (voice_room_name) => {
        ipcRenderer.send('receptionVoiceRoomName', voice_room_name);
    },
    receptionVoiceRoomName: (voice_room_name) => ipcRenderer.on('sendVoiceRoomName', voice_room_name),
    sendVideoRoomName: (video_room_name) => {
        ipcRenderer.send('receptionVideoRoomName', video_room_name);
    },
    receptionVideoRoomName: (video_room_name) => ipcRenderer.on('sendVideoRoomName', video_room_name),
});