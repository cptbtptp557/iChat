import {reactive, ref} from "vue";

export const homeActionBar = () => {
    const message_badge = ref(false); // 消息红点显示
    const user_lists = reactive({name: "蒸艾粉IKUN", iid: 10001, signature: "我爱鸽鸽!!!"});

    return {
        message_badge,
        user_lists,
    }
}