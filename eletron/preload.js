const {contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    setTitle: (title) => {
        console.log(title);
        ipcRenderer.send('setTitle', title);
    },
})