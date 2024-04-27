import {reactive, ref} from "vue";

export const homeActionBar = () => {
    const message_badge = ref(false); // 消息红点显示
    const user_lists = reactive({name: "蒸艾粉IKUN", iid: 10001, signature: "我爱鸽鸽!!!"});

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

    return {
        message_badge,
        user_lists,
        selected,
    }
}