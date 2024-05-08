import {homeActionBar} from "../../homeActionBar/homeActionBar.ts";
import {ref} from "vue";

export const friendsList = () => {
    const friends_lists = ref(true);
    const friend_signIn_status = ref(true);
    const gender = ref("man");
    const remark = ref("朋友备注(最大10字)");
    const warn_show = ref(false);

    // 判断备注长度并上传
    const changeRemark = (): void => {
        warn_show.value = remark.value.length > 12;
    }
    // 打开语音通话界面
    const openVoiceCallWindow = (): void => {
        window.electronAPI.openVoiceCallWindow();
    }
    // 打开视频通话界面
    const openVideoCallWindow = (): void => {
        window.electronAPI.openVideoWindow();
    }
    // 打开聊天界面
    const openChatWindow = (): void => {
        homeActionBar().goMessageHref();
    }

    return {
        friends_lists,
        friend_signIn_status,
        gender,
        remark,
        changeRemark,
        warn_show,
        openVoiceCallWindow,
        openVideoCallWindow,
        openChatWindow,
    }
}