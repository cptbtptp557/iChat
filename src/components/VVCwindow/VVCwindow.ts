import {ref} from "vue";
import socket from "../../socket";

export const VVCwindow = () => {
    const VVCW_status = ref(1);
    const one_on_one_voice_list = ref();


    // 接通通话
    const connect = () => {
        window.electronAPI.openVoiceCallWindow();
        VVCW_status.value = 1;
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

    return {
        VVCW_status,
        connect,
        hangUp,
    }
}