import {ref, watch} from "vue";

export const homeChatBar = () => {
    const content = ref(); // 输入内容
    const button_disabled = ref(false);
    const more_window = ref(false);
    const more_window_model = ref(false);

    // 打开语音通话界面
    const openVoiceCallWindow = (): void => {
        window.electronAPI.openVoiceCallWindow();
    }
    // 打开视频通话界面
    const openVideoCallWindow = (): void => {
        window.electronAPI.openVideoWindow();
    }
    const openMoreWindow = (): void => {
        more_window.value = true;
    }

    watch(content, (): void => {
        button_disabled.value = content.value !== "";
    })

    return {
        content,
        button_disabled,
        openVoiceCallWindow,
        openVideoCallWindow,
        more_window,
        openMoreWindow,
        more_window_model,
    }
}