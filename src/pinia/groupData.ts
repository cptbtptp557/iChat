import {defineStore} from "pinia";
import {ref} from "vue";

export const groupData = defineStore('groupData', () => {
    const group_state = ref(1); // 打开的是否是群聊天

    return {
        group_state,
    }
})