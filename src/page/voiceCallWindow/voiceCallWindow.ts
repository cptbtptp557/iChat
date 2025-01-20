import {onMounted, ref} from "vue";
import {VoiceCalls} from "../../WebRTC/VoiceCalls.ts";
import socket from "../../socket";

export const voiceCallWindow = () => {
    const microphone_state = ref(true);
    const horn_state = ref(true);
    const top_state = ref("拨通中");
    const voice_room = ref();

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
    const voiceLoading = () => {
        top_state_timer = setTimeout(() => {
            top_state.value = "拨通中.";

            setTimeout(() => {
                top_state.value = "拨通中..";
                setTimeout(() => {
                    top_state.value = "拨通中...";

                    if (!top_state_boolean) {
                        top_state.value = "对方已挂断";
                        return;
                    }
                    voiceLoading();
                }, 700)
            }, 700)
        }, 700)
    }

    let fromUserId: number;
    const voiceHangUp = () => {
        socket.emit("delete_voice_room", [voice_room.value, fromUserId]);
        window.electronAPI.closeWindow("audio_window");
    }

    socket.on("changFromUserWindowState", (data: any) => {
        if (!Boolean(data[0])) {
            top_state_boolean = Boolean(data[0]);
            clearTimeout(top_state_timer);
            console.log(data[1])
            fromUserId = data[1];
        }
    })

    window.electronAPI.receptionVoiceRoomName((_event: object, voiceRoomName: any) => {
        socket.emit("fromUserJoinRoom", voiceRoomName);
        console.log(voiceRoomName)
        voice_room.value = voiceRoomName;
    })

    onMounted(() => {
        voiceLoading();
    })

    return {
        closeVoice,
        miniVoice,
        top_state,
        microphone_state,
        microphoneButton,
        horn_state,
        hornButton,
        voiceHangUp,
    }
}