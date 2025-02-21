import message from "../components/chat/message.vue";
import raidenShogun from "../components/raidenShogun/raidenShogun.vue";
import {defineStore} from "pinia";
import {ref, shallowRef} from "vue";
import {groupData} from "./groupData.ts";
import chatChatBar from "../components/chat/chatChatBar/homeChatBar.vue";

export const usersLists = defineStore('usersLists', () => {
    const thisUserAccount = ref(); // 当前登陆账户的账号
    const thisUserNickname = ref(); // 当前账号昵称
    const new_chat_friend_iId = ref();
    const current = shallowRef(message);
    const all_friends_show_components = shallowRef(raidenShogun);
    const thisUserFriendsLists = ref(); // 当前账户的好友信息
    const thisUserGroupLists = ref(); // 当前账户的群聊信息


    const inData = (): void => {
        current.value = message;
        all_friends_show_components.value = raidenShogun;
        groupData().chat_page.value = chatChatBar;
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
        thisUserGroupLists,
    }
})