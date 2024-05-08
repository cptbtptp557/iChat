import message from "../chat/message.vue";
import friends from "../friends/friends.vue";
import {reactive, ref} from "vue";
import {songToBePlayedLists} from "../../pinia";

export const homeActionBar = () => {
    const message_badge = ref(false); // 消息红点显示
    const user_lists = reactive({name: "蒸艾粉IKUN", iid: 10001, signature: "我爱鸽鸽!!!"});
    const data = ref(); // 生日
    const nickname = ref(); // 昵称
    const signature = ref(); // 个性签名
    const gender = ref(); // 性别

    const selected = (event: any) => {
        const selected_one = document.getElementById("selected_one") as HTMLElement;
        const selected_two = document.getElementById("selected_two") as HTMLElement;

        if (event === "message") {
            selected_one.style.backgroundColor = "rgb(220, 220, 220)";
            selected_two.style.backgroundColor = "transparent";
            selected_one.style.borderRadius = "10px";
        }
        if (event === "friends") {
            selected_one.style.backgroundColor = "transparent";
            selected_two.style.backgroundColor = "rgb(220, 220, 220)";
            selected_two.style.borderRadius = "10px";
        }
    }
    const toMessage = () => {
        selected('message');
        songToBePlayedLists().current = message
    }

    const toFriends = () => {
        selected('friends');
        songToBePlayedLists().current = friends
    }

    const {inData} = songToBePlayedLists();
    const goMessageHref = () => {
        const selected_one = document.getElementById("selected_one") as HTMLElement;
        const selected_two = document.getElementById("selected_two") as HTMLElement;

        selected_one.style.backgroundColor = "rgb(220, 220, 220)";
        selected_two.style.backgroundColor = "transparent";
        selected_one.style.borderRadius = "10px";
        inData(10001);
    }

    const commit = () => {
        console.log(data.value)
    }

    return {
        message_badge,
        user_lists,
        toMessage,
        toFriends,
        goMessageHref,
        data,
        nickname,
        signature,
        gender,
        commit,
    }
}