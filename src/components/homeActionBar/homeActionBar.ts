import {reactive, ref, shallowRef} from "vue";
import message from "../chat/message.vue";

export const homeActionBar = () => {
    const message_badge = ref(false); // 消息红点显示
    const user_lists = reactive({name: "蒸艾粉IKUN", iid: 10001, signature: "我爱鸽鸽!!!"});
    const current = shallowRef(message);

    const selected = (event: any) => {
        const selected_one = document.getElementById("selected_one") as HTMLElement;
        const selected_two = document.getElementById("selected_two") as HTMLElement;

        if (event.target.id === "message") {
            selected_one.style.backgroundColor = "rgb(220, 220, 220)";
            selected_two.style.backgroundColor = "transparent";
            selected_one.style.borderRadius = "10px";
        }
        if (event.target.id === "friends") {
            selected_one.style.backgroundColor = "transparent";
            selected_two.style.backgroundColor = "rgb(220, 220, 220)";
            selected_two.style.borderRadius = "10px";
        }
    }

    const goMessageHref = () => {
        current.value = message;
        // window.location.reload();
        console.log(current.value);
    }

    return {
        message_badge,
        user_lists,
        selected,
        current,
        goMessageHref,
    }
}