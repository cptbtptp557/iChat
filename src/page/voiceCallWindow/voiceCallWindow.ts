import {ref} from "vue";

export const voiceCallWindow = () => {
    const microphone_state = ref(true);
    const horn_state = ref(true);

    // 关闭窗口
    const closeVoice = () => {
        window.electronAPI.closeVoice();
    }

    // 最小化窗口
    const miniVoice = () => {
        window.electronAPI.miniVoice();
    }

    // 麦克风按钮
    const microphoneButton = () => {
        microphone_state.value = !microphone_state.value;
    }

    // 扬声器按钮
    const hornButton = () => {
        horn_state.value = !horn_state.value;
    }

    return {
        closeVoice,
        miniVoice,
        microphone_state,
        microphoneButton,
        horn_state,
        hornButton,
    }
}