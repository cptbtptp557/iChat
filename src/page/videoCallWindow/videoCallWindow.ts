import {ref} from "vue";

export const videoCallWindow = () => {
    const audio_show = ref(true);
    const camera_show = ref(true);

    const closeVoice = () => {
        window.electronAPI.closeWindow("video_window");
    }

    // 最小化窗口
    const miniVoice = () => {
        window.electronAPI.miniWindow("video_window");
    }

    const changeMicrophone = () => {
        audio_show.value = !audio_show.value
    }

    const changeCamera = () => {
        camera_show.value = !camera_show.value
    }


    return {
        audio_show,
        camera_show,
        closeVoice,
        miniVoice,
        changeMicrophone,
        changeCamera,
    }
}