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

    let top_state_timer: any;
    let top_state_boolean: boolean = true;
    const aaa = () => {
        top_state_timer = setTimeout(() => {
            top_state.value = "拨通中.";

            setTimeout(() => {
                top_state.value = "拨通中..";
                setTimeout(() => {
                    top_state.value = "拨通中...";

                    if (!top_state_boolean) return;
                    aaa();
                }, 700)
            }, 700)
        }, 700)
    }

    socket.on("changFromUserWindowState", (data: boolean) => {
        if (!data) {
            top_state_boolean = data;
            console.log(data)
            clearTimeout(top_state_timer);
            top_state.value = "对方已挂断";
        }
    })

    window.electronAPI.receptionVoiceRoomName((_event: object, voiceRoomName: any) => {
        socket.emit("fromUserJoinRoom", voiceRoomName);
        console.log(voiceRoomName)
    })

    onMounted(() => {
        aaa();
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