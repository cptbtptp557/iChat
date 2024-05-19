import {onMounted, ref} from "vue";
import socket from "../../socket";
import {api} from "../../pinia/api.ts";
import {usersLists} from "../../pinia/usersLists.ts";

export const friendNotifications = () => {
    const application_status = ref("已同意"); // 申请状态
    const friend_add_recording = ref(); // 被申请添加记录

    socket.on('add_lists', (addLists) => {
        console.log(addLists)
    });

    onMounted(() => {
        api().getAddRecording(usersLists().thisUserAccount)
            .then(data => {
                friend_add_recording.value = data.data.result;
            }).catch(console.error);
    });
    return {
        application_status,
        friend_add_recording,
    }
}