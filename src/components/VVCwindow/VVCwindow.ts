import {ref} from "vue";
import socket from "../../socket";

export const VVCwindow = () => {
    const VVCW_status = ref(1);
    const one_on_one_voice_list = ref();


    // 接通通话
    const connect = () => {
        try {
            window.electronAPI.openVoiceCallWindow();
            VVCW_status.value = 1;
            socket.emit("toUserVVCwindowJoinRoom", one_on_one_voice_list.value);
        } catch (err) {
            window.open('http://localhost:5173/voiceCallWindow', '_blank');
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

    return {
        VVCW_status,
        connect,
        hangUp,
    }
}