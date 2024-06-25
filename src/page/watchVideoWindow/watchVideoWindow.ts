import {onMounted, ref} from "vue";

export const watchVideoWindow = () => {
    const window_size = ref(true); // 窗口的大小

    const miniVoice = () => {
        window.electronAPI.miniWindow("watch_video");
    }

    const windowSize = () => {
        window.electronAPI.maximizeWindow("watch_video");
        window_size.value = !window_size.value;
    }

    const closeVoice = () => {
        window.electronAPI.closeWindow("watch_video");
    }

    onMounted(() => {

    })

    return {
        miniVoice,
        windowSize,
        closeVoice,
        window_size,
    }
}