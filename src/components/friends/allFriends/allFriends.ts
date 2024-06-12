import friendNotification from "../../friendNotifications/friendNotifications.vue";
import groupChatNotification from "../../groupChatNotifications/groupChatNotifications.vue";
import friendsList from "../friendsLists/friendsLists.vue";
import theGroupLists from "../groupLists/groupLists.vue";
import raidenShogun from "../../raidenShogun/raidenShogun.vue";
import {usersLists} from "../../../pinia/usersLists.ts";
import {api} from "../../../pinia/api.ts";
import {nextTick, onDeactivated, onMounted, ref} from "vue";

export const allFriends = () => {
    const search_friend = ref(); // 好友搜索框
    const options = ref(['好友', '群聊']);
    const this_options = ref('好友');
    const friends_number = ref(); // 好友列表
    const friends_lists: any = ref({}); // 好友详细信息
    const change_color = ref(); // 修改背景颜色
    const all_group_data = ref(); // 所有所在群信息

    const {changeAllFriendsShowComponents, thisUserAccount} = usersLists();

    // 查询好友---进行了防抖处理
    let timer: any;
    const searchFriend = () => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            if (search_friend.value) {
                console.log(search_friend.value);
            }
        }, 1500);
    };

    const changeOptions = () => {
        changeAllFriendsShowComponents(raidenShogun);
        change_color.value = '';

        if (this_options.value === "好友") {
            getFriendsLists();
        } else if (this_options.value === "群聊") {
            getGroupLists();
        }
    };

    const friendNotifications = () => {
        change_color.value = '';
        changeAllFriendsShowComponents(friendNotification);
    };

    const groupChatNotifications = () => {
        change_color.value = '';
        changeAllFriendsShowComponents(groupChatNotification);
    };

    const friendLists = (lists: any, index: number) => {
        change_color.value = index;

        nextTick(() => {
            for (let i: number = 0; i < friends_number.value.length; i++) {
                if (lists.friend_iId === friends_lists.value[i][0].iId)
                    usersLists().thisUserFriendsLists = [friends_lists.value[i][0], lists.friend_notes];
            }
            changeAllFriendsShowComponents(friendsList);
        })
    };

    const groupLists = (lists: any, index: number) => {
        change_color.value = index;
        api().groupUserData(lists.gId)
            .then(data => {
                usersLists().thisUserGroupLists = [lists, data.data.group_user_data];
                changeAllFriendsShowComponents(theGroupLists);
            }).catch(console.error);
    }

    const getFriendsLists = () => {
        api().getFriendsLists(usersLists().thisUserAccount)
            .then(data => {
                friends_number.value = data.data.result;
                for (let i: number = 0; i < friends_number.value.length; i++) {
                    api().getUserLists("totalusers", friends_number.value[i].friend_iId)
                        .then(lists => {
                            friends_lists.value[i] = lists.data.result;
                        })
                }
            })
    }

    const getGroupLists = () => {
        api().allInsideGroupLists(thisUserAccount)
            .then(lists => {
                all_group_data.value = lists.data.group_data;
            }).catch(console.error);
    }

    onMounted(() => {
        changeOptions();
    });

    onDeactivated(() => {
        change_color.value = '';
    });

    return {
        search_friend,
        searchFriend,
        options,
        this_options,
        changeOptions,
        friendNotifications,
        groupChatNotifications,
        friendLists,
        groupLists,
        friends_number,
        friends_lists,
        change_color,
        all_group_data,
    }
}