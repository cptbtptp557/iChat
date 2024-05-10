import {ref} from "vue";

export const homeFriendsBar = () => {
    const add_friend = ref(false); // 添加好友框
    const find_logotype = ref(); // 添加好友内输入的内容

    const find = () => {
        console.log(find_logotype.value);
    }

    const empty = () => {
        find_logotype.value = "";
    }

    const changeBorder = (even: any) => {
        const user = document.getElementById("user") as HTMLElement
        const group_chats = document.getElementById("group_chats") as HTMLElement;
        console.log(even.srcElement.__vnode.children )
        if (even.srcElement.__vnode.children === "用户") {
            user.style.borderColor = "#000";
            group_chats.style.borderColor = "transparent";
        }
        if(even.srcElement.__vnode.children === "群聊") {
            user.style.borderColor = "transparent";
            group_chats.style.borderColor = "#000";
        }
    }

    return {
        add_friend,
        find,
        find_logotype,
        empty,
        changeBorder,
    }
}