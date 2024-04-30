/// <reference types="vite/client" />

export interface IElectronAPI {
    openVoiceCallWindow: (value) => Promise<void>,
}

declare global {
    interface Window {
        electronAPI: IElectronAPI,
    }
}