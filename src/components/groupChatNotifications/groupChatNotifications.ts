import {ref} from "vue";

export const groupChatNotifications = () => {
    const application_status = ref("同意"); // 申请状态

    return {
        application_status,
    }
}