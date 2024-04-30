import {ref, watch} from "vue";

export const homeChatBar = () => {
    const content = ref(); // 输入内容
    const button_disabled = ref(false);

    const openVoiceCallWindow = () => {
        console.log(window.electronAPI)
        window.electronAPI.openVoiceCallWindow("我被点击了!!!");
    }

    watch(content, () => {
        button_disabled.value = content.value !== "";
    })

    return {
        content,
        button_disabled,
        openVoiceCallWindow,
    }
}