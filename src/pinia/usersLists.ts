import message from "../components/chat/message.vue";
import raidenShogun from "../components/raidenShogun/raidenShogun.vue";
import {defineStore} from "pinia";
import {ref, shallowRef} from "vue";

export const usersLists = defineStore('usersLists', () => {
    const thisUserAccount = ref(); // 当前登陆账户的账号
    const thisUserNickname = ref(); // 当前账号昵称
    const new_chat_friend_iId = ref();
    const current = shallowRef(message);
    const all_friends_show_components = shallowRef(raidenShogun);
    const thisUserFriendsLists = ref(); // 当前账户的好友信息


    const inData = (lists: number): void => {
        new_chat_friend_iId.value = lists;
        current.value = message;
        all_friends_show_components.value = raidenShogun;
    };

    const changeAllFriendsShowComponents = (components: any) => {
        all_friends_show_components.value = components;
    };

    return {
        new_chat_friend_iId,
        inData,
        current,
        thisUserAccount,
        thisUserNickname,
        all_friends_show_components,
        changeAllFriendsShowComponents,
        thisUserFriendsLists,
    }
})