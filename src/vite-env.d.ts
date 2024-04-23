/// <reference types="vite/client" />

export interface IElectronAPI {
    setTitle: (value) => Promise<void>,
}

declare global {
    interface Window {
        electronAPI: IElectronAPI,
    }
}