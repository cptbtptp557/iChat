import {onMounted, ref} from "vue";
import {api} from "../../pinia/api.ts";
import {usersLists} from "../../pinia/usersLists.ts";

export const groupChatNotifications = () => {
    const this_user_iId = ref(usersLists().thisUserAccount);
    const application_status = ref("已同意"); // 申请状态
    const group_notice = ref(); // 群通知列表

    onMounted(() => {
        api().getAddGroupRecording(usersLists().thisUserAccount)
            .then(data => {
                group_notice.value = data.data.result;
                console.log(group_notice.value)
            }).catch(console.error);
    });

    return {
        this_user_iId,
        application_status,
        group_notice,
    }
}