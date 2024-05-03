/// <reference types="vite/client" />

export interface IElectronAPI {
    openVoiceCallWindow: () => void,
    closeWindow: (window_name) => Promise<void>,
    miniWindow: (window_name) => Promise<void>,
}

declare global {
    interface Window {
        electronAPI: IElectronAPI,
    }
}