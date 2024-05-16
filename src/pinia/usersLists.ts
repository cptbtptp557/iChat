import message from "../components/chat/message.vue";
import {defineStore} from "pinia";
import {ref, shallowRef} from "vue";

export const usersLists = defineStore('usersLists', () => {
    const thisUserAccount = ref(); // 当前登陆账户的账号
    const new_chat_friend_iId = ref();
    const current = shallowRef(message);

    const inData = (lists: number): void => {
        new_chat_friend_iId.value = lists;
        current.value = message;
    };

    return {
        new_chat_friend_iId,
        inData,
        current,
        thisUserAccount,
    }
})