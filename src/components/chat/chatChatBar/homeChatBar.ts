import {ref, watch} from "vue";

export const homeChatBar = () => {
    const content = ref(); // 输入内容
    const button_disabled = ref(false);

    watch(content, () => {
        button_disabled.value = content.value !== "";
    })

    return {
        content,
        button_disabled,
    }
}