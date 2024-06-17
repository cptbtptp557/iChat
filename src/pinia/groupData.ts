import {defineStore} from "pinia";
import {computed, ref, shallowRef} from "vue";
import raidenShogun from "../components/raidenShogun/raidenShogun.vue";

export const groupData = defineStore('groupData', () => {
    const group_state = ref(1); // 打开的是否是群聊天
    const chat_page = computed(() => shallowRef(raidenShogun));

    return {
        group_state,
        chat_page,
    }
})