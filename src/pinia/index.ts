import message from "../components/chat/message.vue";
import {defineStore} from "pinia";
import {ref, shallowRef} from "vue";

export const songToBePlayedLists = defineStore('friendsLists', () => {
    const new_chat_friend_iId = ref();
    const current = shallowRef(message);

    let inData = (lists: number): void => {
        new_chat_friend_iId.value = lists;
        current.value = message;
    }

    return {
        new_chat_friend_iId,
        inData,
        current,
    }
})