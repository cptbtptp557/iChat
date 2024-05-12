import {ref, watch} from "vue";
import {groupData} from "../../../pinia/groupData.ts";

export const homeChatBar = () => {
    const content = ref(); // 输入内容
    const button_disabled = ref(false);
    const more_window = ref(false);
    const group_name = ref("群聊名称");
    const group_announcement = ref("群公告");
    const group_permissions = ref(true); // 群聊权限.true为不可修改，false为可修改

    const {group_state} = groupData();

    // 打开语音通话界面
    const openVoiceCallWindow = (): void => {
        window.electronAPI.openVoiceCallWindow();
    }
    // 打开视频通话界面
    const openVideoCallWindow = (): void => {
        window.electronAPI.openVideoWindow();
    }
    const openMoreWindow = (): void => {
        more_window.value = true;
    }

    const changeGroupName = () => {
        console.log(group_name.value);
    }
    const changeGroupAnnouncement = () => {
        console.log(group_announcement.value);
    }

    watch(content, (): void => {
        button_disabled.value = content.value !== "";
    })

    return {
        content,
        button_disabled,
        openVoiceCallWindow,
        openVideoCallWindow,
        more_window,
        openMoreWindow,
        group_name,
        group_permissions,
        changeGroupName,
        group_announcement,
        changeGroupAnnouncement,
        group_state,
    }
}