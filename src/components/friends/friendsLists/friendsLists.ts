import {homeActionBar} from "../../homeActionBar/homeActionBar.ts";
import {onActivated, ref} from "vue";
import {usersLists} from "../../../pinia/usersLists.ts";
import socket from "../../../socket";

export const friendsList = () => {
    const friends_lists = ref(); // 好友详细信息
    const gender = ref("man");
    const remark = ref("朋友备注(最大10字)");
    const warn_show = ref(false);
    const frined_age = ref(); // 朋友年龄

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
    };

    const getFriendsLists = () => {
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        let date = now.getDate();
        let birthDate = new Date(usersLists().thisUserFriendsLists[0].birthday.replace(/-/g, '/'));
        let age = year - birthDate.getFullYear();
        let m = month - birthDate.getMonth();
        if (m < 0 || (m === 0 && date < birthDate.getDate())) {
            age--;
        }
        frined_age.value = age;

        friends_lists.value = usersLists().thisUserFriendsLists[0];
        remark.value = usersLists().thisUserFriendsLists[1];
        gender.value = usersLists().thisUserFriendsLists[0].gender === '男' ? 'man' : 'woman';
    }

    document.addEventListener('click', () => {
        getFriendsLists();
    })

    onActivated(() => {
        getFriendsLists();
    });

    socket.on("user_login", (userId) => {
        if (friends_lists.value.iId == userId) {
            friends_lists.value.onlinepresence = "1";
        }
    });
    socket.on("sign_out", (userId) => {
        if (friends_lists.value.iId == userId) {
            friends_lists.value.onlinepresence = "0";
        }
    });

    return {
        friends_lists,
        gender,
        remark,
        changeRemark,
        warn_show,
        openVoiceCallWindow,
        openVideoCallWindow,
        openChatWindow,
        frined_age,
    }
}