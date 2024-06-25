/// <reference types="vite/client" />

export interface IElectronAPI {
    openVoiceCallWindow: () => void,
    openVideoWindow: () => void,
    watchVideo: (videoName: string | number, videoSrc: string) => void,
    closeWindow: (windowName: string) => Promise<void>,
    miniWindow: (windowName: string) => Promise<void>,
    maximizeWindow: (windowName: string) => Promise<void>,
}

declare global {
    interface Window {
        electronAPI: IElectronAPI,
    }
}