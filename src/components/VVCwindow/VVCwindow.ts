import {ref} from "vue";

export const VVCwindow = () => {
    const VVCW_status = ref(1);


    // 接通通话
    const connect = () => {
        VVCW_status.value = 0;
    }

    // 结束通话
    const hangUp = () => {
        VVCW_status.value = 1;
    }

    return {
        VVCW_status,
        connect,
        hangUp,
    }
}