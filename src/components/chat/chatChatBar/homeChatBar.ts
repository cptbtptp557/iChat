import {h, onActivated, ref, watch} from "vue";
import {groupData} from "../../../pinia/groupData.ts";
import {classLists} from "../../../class";
import {ElNotification} from "element-plus";
import {usersLists} from "../../../pinia/usersLists.ts";
import socket from "../../../socket";

export const homeChatBar = () => {
    const content = ref(); // 输入内容
    const button_disabled = ref(false);
    const more_window = ref(false);
    const group_name = ref("群聊名称");
    const group_announcement = ref("群公告");
    const group_permissions = ref(true); // 群聊权限.true为不可修改，false为可修改
    const group_add_users = ref(false);
    const group_add_users_inquire = ref(); // 邀请好友加入群聊时的查询输入字段
    const selected_users = ref([]);
    const invite_users = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]); // 邀请加入群聊的好友
    const look_more_group_users = ref(false);
    const look_more_group_users_inquire = ref(); // 更多群成员查询
    const copy_success = ref(false); // 复制成功告示
    const paste_message = ref(); // 粘贴板内容

    const {group_state} = groupData();
    const {friend_chat_message} = classLists();

    // 打开语音通话界面
    const openVoiceCallWindow = (): void => {
        window.electronAPI.openVoiceCallWindow();
    }
    // 打开视频通话界面
    const openVideoCallWindow = (): void => {
        window.electronAPI.openVideoWindow();
    }
    const openMoreWindow = (): void => {
        more_window.value = true;
    }

    const changeGroupName = (): void => {
        console.log(group_name.value);
    }
    const changeGroupAnnouncement = (): void => {
        console.log(group_announcement.value);
    }
    const openGroupAnnouncements = (): void => {
        ElNotification({
            title: '群公告',
            offset: 30,
            duration: 5000,
            message: h('i', {style: 'color: teal'}, group_announcement.value),
        });
    }

    const inviteUsersLists = (): void => {
        console.log(selected_users.value)
    }

    const copyText = (event: any): void => {
        const selectedText: string | undefined = window.getSelection()?.toString();
        const copy_button = document.getElementById("copy") as HTMLElement;

        if (selectedText !== '') {
            copy_button.style.left = event.clientX + "px";
            copy_button.style.top = event.clientY + "px";
            copy_button.style.display = "inherit";

            copy_button.addEventListener("click", async () => {
                await navigator.clipboard.writeText(String(selectedText))
                    .then(() => {
                        paste_message.value = selectedText;
                        copy_button.style.display = "none";
                        copy_success.value = true;
                        setTimeout(() => {
                            copy_success.value = false;
                        }, 3000);
                    })
            })
        }
    }

    const pasteText = (event: any): void => {
        const paste_button = document.getElementById("paste") as HTMLElement;

        paste_button.style.left = event.clientX + "px";
        paste_button.style.top = event.clientY + "px";
        paste_button.style.display = "inherit";
    }

    const paste = async () => {
        const paste_button = document.getElementById("paste") as HTMLElement;
        const textarea = document.getElementById("textarea") as HTMLInputElement;
        const start = textarea.selectionStart;

        await navigator.clipboard.readText()
            .then((message) => {
                paste_button.style.display = "none";
                if (!content.value) content.value = message;
                else content.value = content.value.slice(0, start) + message + content.value.slice(start);
            })
    }

    document.addEventListener("click", () => {
        const paste_button = document.getElementById("paste") as HTMLElement;
        const copy_button = document.getElementById("copy") as HTMLElement;

        paste_button.style.display = "none";
        copy_button.style.display = "none";
    })

    const sendMessage = (): void => {
        const message = new friend_chat_message(usersLists().thisUserAccount, 10005, content.value)

        socket.emit("sendFriendMessage", message);
        content.value = "";
    }

    socket.on("sendFriendMessage", (message: any): void => {
        console.log(message)
    })

    socket.on("chatUsersIds", (thisAccountId: any): void => {
        console.log(thisAccountId)

    })

    watch(content, (): void => {
        button_disabled.value = content.value !== "";
    });

    onActivated(() => {
        const dialogBox = document.getElementById("dialogBox") as HTMLElement;

        dialogBox.scrollTo({top: dialogBox.scrollHeight, behavior: 'instant'});
        console.log(usersLists().thisUserAccount)
    });

    return {
        content,
        button_disabled,
        openVoiceCallWindow,
        openVideoCallWindow,
        more_window,
        openMoreWindow,
        group_name,
        group_permissions,
        changeGroupName,
        group_announcement,
        changeGroupAnnouncement,
        openGroupAnnouncements,
        group_state,
        group_add_users,
        group_add_users_inquire,
        invite_users,
        selected_users,
        inviteUsersLists,
        look_more_group_users,
        look_more_group_users_inquire,
        copyText,
        pasteText,
        paste,
        copy_success,
        sendMessage,
    }
}