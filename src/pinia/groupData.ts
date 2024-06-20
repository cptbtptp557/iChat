import {defineStore} from "pinia";
import {computed, ref, shallowRef} from "vue";
import raidenShogun from "../components/raidenShogun/raidenShogun.vue";

export const groupData = defineStore('groupData', () => {
    const group_state = ref(1); // 打开的是否是群聊天
    const chat_page = computed(() => shallowRef(raidenShogun));
    const this_chat_friend_lists = computed(() => ref()); // 当前聊天好友信息
    const this_file_lists = computed(() => ref()); // 当前文件信息

    return {
        group_state,
        chat_page,
        this_chat_friend_lists,
        this_file_lists,
    }
})