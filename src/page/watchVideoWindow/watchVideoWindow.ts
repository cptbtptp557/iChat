import {onMounted, ref} from "vue";

export const watchVideoWindow = () => {
    const window_size = ref(true); // 窗口的大小
    const video_lists = ref(); // 视频信息

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

    window.electronAPI.sendVideoLists((_event: object, videoLists: object) => {
        video_lists.value = videoLists;
    })

    onMounted(() => {

    })

    return {
        miniVoice,
        windowSize,
        closeVoice,
        window_size,
        video_lists,
    }
}

//      _ooOoo_
//     o8888888o
//     88" . "88
//     (| - - |)
//     O\  =  /O
//   ___/'---'\___
// '  \\|     |//  '
//'