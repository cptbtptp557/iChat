/// <reference types="vite/client" />

export interface IElectronAPI {
    openVoiceCallWindow: () => void,
    openVideoWindow: () => void,
    closeWindow: (windowName) => Promise<void>,
    miniWindow: (windowName) => Promise<void>,
}

declare global {
    interface Window {
        electronAPI: IElectronAPI,
    }
}