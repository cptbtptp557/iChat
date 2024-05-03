/// <reference types="vite/client" />

export interface IElectronAPI {
    openVoiceCallWindow: (value) => Promise<void>,
    mouseCoordinates: (x, y) => Promise<void>,
    closeVoice: () => void,
    miniVoice: () => void,
}

declare global {
    interface Window {
        electronAPI: IElectronAPI,
    }
}