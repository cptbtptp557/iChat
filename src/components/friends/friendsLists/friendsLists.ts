import {homeActionBar} from "../../homeActionBar/homeActionBar.ts";
import {onActivated, ref} from "vue";
import {usersLists} from "../../../pinia/usersLists.ts";
import socket from "../../../socket";
import {groupData} from "../../../pinia/groupData.ts";

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
        socket.emit("VCRoom", {
            from: usersLists().thisUserAccount >>> 0,
            to: friends_lists.value.iId
        });

        try {
            window.electronAPI.openVoiceCallWindow();
        } catch (err) {
            window.open('http://localhost:5173/voiceCallWindow', '_blank');
        }
    }

    // 打开视频通话界面
    const openVideoCallWindow = (): void => {
        try {
            window.electronAPI.openVideoWindow();
        } catch (err) {
            window.open('http://localhost:5173/videoCallWindow', '_blank');
        }
    }

    // 打开聊天界面
    const openChatWindow = (): void => {
        homeActionBar().goMessageHref();
        console.log(friends_lists.value)
        groupData().this_chat_friend_lists.value = friends_lists.value;
        socket.emit("chatUsersIds", {
            type: "friend",
            thisUserId: usersLists().thisUserAccount >>> 0,
            thisChatFriendId: friends_lists.value.iId
        });
    };

    const getFriendsLists = () => {
        let now: Date = new Date();
        let year: number = now.getFullYear();
        let month: number = now.getMonth() + 1;
        let date: number = now.getDate();
        let birthDate: Date = new Date(usersLists().thisUserFriendsLists[0].birthday.replace(/-/g, '/'));
        let age: number = year - birthDate.getFullYear();
        let m: number = month - birthDate.getMonth();
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