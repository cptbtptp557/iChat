import {onMounted, ref} from "vue";
import {VoiceCalls} from "../../WebRTC/VoiceCalls.ts";
import socket from "../../socket";

export const voiceCallWindow = () => {
    const microphone_state = ref(true);
    const horn_state = ref(true);
    const top_state = ref("拨通中");

    const {} = VoiceCalls();

    // 关闭窗口
    const closeVoice = () => {
        window.electronAPI.closeWindow("audio_window");
    }

    // 最小化窗口
    const miniVoice = () => {
        window.electronAPI.miniWindow("audio_window");
    }

    // 麦克风按钮
    const microphoneButton = () => {
        microphone_state.value = !microphone_state.value;
    }

    // 扬声器按钮
    const hornButton = () => {
        horn_state.value = !horn_state.value;
    }

    try {
        window.electronAPI.receptionVoiceRoomName((_event: object, voiceRoomName: any) => {
            console.log("房间号:" + voiceRoomName)
            socket.emit("fromUserJoinRoom", voiceRoomName);
        })
    } catch (e) {
        console.log(e)
    }

    onMounted(() => {

    })

    return {
        closeVoice,
        miniVoice,
        top_state,
        microphone_state,
        microphoneButton,
        horn_state,
        hornButton,
    }
}