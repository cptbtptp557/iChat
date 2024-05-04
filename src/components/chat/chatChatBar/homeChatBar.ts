import {ref, watch} from "vue";

export const homeChatBar = () => {
    const content = ref(); // 输入内容
    const button_disabled = ref(false);

    // 打开语音通话界面
    const openVoiceCallWindow = () => {
        window.electronAPI.openVoiceCallWindow();
    }

    const openVideoCallWindow = () => {
        window.electronAPI.openVideoWindow();
    }

    watch(content, () => {
        button_disabled.value = content.value !== "";
    })

    return {
        content,
        button_disabled,
        openVoiceCallWindow,
        openVideoCallWindow,
    }
}