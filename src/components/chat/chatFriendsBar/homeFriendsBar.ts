import {ref} from "vue";

export const homeFriendsBar = () => {
    const add_friend = ref(false); // 添加好友框
    const find_logotype = ref(); // 添加好友内输入的内容
    const confirm_add_friend = ref(false); // 确认添加好友框
    const introduce_yourself = ref("发起方昵称"); // 添加好友时的自我介绍
    const receiver_remarks = ref("给被添加方的备注"); // 添加好友时给被添加方的备注

    const find = () => {
        console.log(find_logotype.value);
    }

    const empty = () => {
        find_logotype.value = "";
    }

    const changeBorder = (even: any) => {
        const user = document.getElementById("user") as HTMLElement
        const group_chats = document.getElementById("group_chats") as HTMLElement;
        console.log(even.srcElement.__vnode.children)
        if (even.srcElement.__vnode.children === "用户") {
            user.style.borderColor = "#4B70E2FF";
            user.style.color = "#4B70E2FF";
            group_chats.style.borderColor = "transparent";
            group_chats.style.color = "#000";
        }
        if (even.srcElement.__vnode.children === "群聊") {
            user.style.borderColor = "transparent";
            user.style.color = "#000";
            group_chats.style.borderColor = "#4B70E2FF";
            group_chats.style.color = "#4B70E2FF";
        }
    }

    const confirmAddFriend = () => {
        confirm_add_friend.value = true;
    }

    return {
        add_friend,
        find,
        find_logotype,
        empty,
        changeBorder,
        confirm_add_friend,
        confirmAddFriend,
        introduce_yourself,
        receiver_remarks,
    }
}