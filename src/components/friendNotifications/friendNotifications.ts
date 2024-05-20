import {onMounted, ref} from "vue";
import socket from "../../socket";
import {api} from "../../pinia/api.ts";
import {usersLists} from "../../pinia/usersLists.ts";

export const friendNotifications = () => {
    const friend_add_recording = ref(); // 被申请添加记录

    // 同意添加申请
    const agree = (recording: any) => {
        console.log(recording)
    }
    // 拒绝添加申请
    const refuse = (recording: any) => {
        api().refuseAddRequest(recording.from_iid, recording.to_iid)
            .then(() => {
                for (let i = 0; i < friend_add_recording.value.length; i++) {
                    if (friend_add_recording.value[i].from_iid === recording.from_iid && friend_add_recording.value[i].to_iid === recording.to_iid) {
                        friend_add_recording.value[i].add_status = 2;
                        break;
                    }
                }
            }).catch(console.error);

    }

    socket.on('add_lists', (addLists) => {
        friend_add_recording.value.unshift(addLists);
    });

    onMounted(() => {
        api().getAddRecording(usersLists().thisUserAccount)
            .then(data => {
                friend_add_recording.value = data.data.result;
            }).catch(console.error);
    });
    return {
        friend_add_recording,
        agree,
        refuse,
    }
}