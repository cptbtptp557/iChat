import friendNotification from "../../friendNotifications/friendNotifications.vue";
import groupChatNotification from "../../groupChatNotifications/groupChatNotifications.vue";
import friendsList from "../friendsLists/friendsLists.vue";
import {usersLists} from "../../../pinia/usersLists.ts";
import {ref} from "vue";

export const allFriends = () => {
    const search_friend = ref(); // 好友搜索框
    const options = ref(['好友', '群聊']);
    const this_options = ref('好友');

    const {changeAllFriendsShowComponents} = usersLists();

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
        if (this_options.value === "好友") {
            console.log(this_options.value)
        } else if (this_options.value === "群聊") {
            console.log(this_options.value)
        }
    };

    const friendNotifications = () => {
        changeAllFriendsShowComponents(friendNotification);
    };

    const groupChatNotifications = () => {
        changeAllFriendsShowComponents(groupChatNotification);
    };

    const friendLists = () => {
        changeAllFriendsShowComponents(friendsList);
    };

    return {
        search_friend,
        searchFriend,
        options,
        this_options,
        changeOptions,
        friendNotifications,
        groupChatNotifications,
        friendLists,
    }
}