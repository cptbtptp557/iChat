import {ref} from "vue";
import socket from "../../socket";

export const VVCwindow = () => {
    const VVCW_status = ref(1);
    const one_on_one_voice_list = ref();
    const call_type = ref();


    // 接通通话
    const connect = () => {
        try {
            if (call_type.value == 0) window.electronAPI.openVoiceCallWindow();
            else if (call_type.value == 1) window.electronAPI.openVideoWindow();
            VVCW_status.value = 1;
            socket.emit("toUserVVCwindowJoinRoom", one_on_one_voice_list.value);
        } catch (err) {
            if (call_type.value == 0) window.open('http://localhost:5173/voiceCallWindow', '_blank');
            else if (call_type.value == 1) window.open('http://localhost:5173/videoCallWindow', '_blank');
            socket.emit("toUserVVCwindowJoinRoom", one_on_one_voice_list.value);
        }
    }

    // 结束通话
    const hangUp = () => {
        VVCW_status.value = 1;
        socket.emit("hangUpVoice", one_on_one_voice_list.value);
    }

    socket.on("openVVCwindow", (signal) => {
        if (signal) {
            VVCW_status.value = 0;
            one_on_one_voice_list.value = signal;
        }
    })

    socket.on("deleteRoom", (room) => {
        socket.emit("deleteRoom", room);
    })

    socket.on("call_type", (type: number) => {
        call_type.value = type;
    })
    return {
        VVCW_status,
        connect,
        hangUp,
        call_type,
    }
}