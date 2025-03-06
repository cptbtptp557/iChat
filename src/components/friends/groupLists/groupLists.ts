import {onActivated, ref} from "vue";
import {usersLists} from "../../../pinia/usersLists.ts";
import {ElMessageBox} from 'element-plus';
import {homeActionBar} from "../../homeActionBar/homeActionBar.ts";
import {groupData} from "../../../pinia/groupData.ts";
import socket from "../../../socket";

export const groupLists = () => {
    const group_lists = ref(usersLists().thisUserGroupLists[0]); // 当前点击群聊数据
    const group_user_lists = ref(usersLists().thisUserGroupLists[1].flattenedUserLists); // 群成员名单
    const man_percentage = ref(); // 性别为男的百分比
    const online_percentage = ref(); // 在线百分比
    const year_percentage = ref(); // 00后百分比

    const showAnnouncement = () => {
        ElMessageBox.alert(group_lists.value.group_announcement, '群公告', {
            draggable: true,
            showConfirmButton: false,
        })
    }

    const getGroupLists = () => {
        const man_mun: number = group_user_lists.value.filter((user: any): boolean => user.gender === '男').length;
        const online_mun: number = group_user_lists.value.filter((user: any): boolean => user.onlinepresence === "1").length;
        const year_mun: number = group_user_lists.value.filter((user: any): boolean => new Date(user.birthday).getFullYear() > 2000).length;

        group_lists.value = usersLists().thisUserGroupLists[0];
        group_user_lists.value = usersLists().thisUserGroupLists[1].flattenedUserLists;
        man_percentage.value = Math.floor((man_mun / group_user_lists.value.length) * 100);
        online_percentage.value = Math.floor((online_mun / group_user_lists.value.length) * 100);
        year_percentage.value = Math.floor((year_mun / group_user_lists.value.length) * 100);
    }

    const sendGroupMessage = () => {
        console.log(group_lists.value);
        homeActionBar().goMessageHref();
        groupData().this_chat_friend_lists.value = group_lists.value;
        socket.emit("chatUsersIds", {
            type: "group",
            thisUserId: usersLists().thisUserAccount >>> 0,
            thisChatFriendId: group_lists.value.gId
        });
    }

    document.addEventListener('click', () => {
        setTimeout(() => {
            getGroupLists();
        }, 50);
    });

    onActivated(() => {
        getGroupLists();
    });

    return {
        group_lists,
        group_user_lists,
        showAnnouncement,
        man_percentage,
        online_percentage,
        year_percentage,
        sendGroupMessage,
    }
}