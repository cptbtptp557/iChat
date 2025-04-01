import {h, onMounted, ref, watch} from "vue";
import {groupData} from "../../../pinia/groupData.ts";
import {classLists} from "../../../class";
import {ElMessage, ElNotification} from "element-plus";
import {usersLists} from "../../../pinia/usersLists.ts";
import {api} from "../../../pinia/api.ts";
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
    const look_more_group_users = ref(false);
    const look_more_group_users_inquire = ref(); // 更多群成员查询
    const copy_success = ref(false); // 复制成功告示
    const paste_message = ref(); // 粘贴板内容
    const scroll_top_height = ref(); // 聊天框滚动条距顶部距离
    const thisChatUsersIds = ref(); // 当前聊天双方iId
    const allChatMessage = ref(); // 聊天记录
    const this_chat_friend_data = ref(); // 当前聊天好友的信息
    const chat_partner = ref(true); // 当前聊天对象。 true: 私聊; false: 群聊
    const group_users_lists = ref(); // 群成员列表
    const can_invited_add_group_users = ref([]); // 可邀请加入群聊好友

    const {group_state} = groupData();
    const {friend_chat_message, group_chat_message} = classLists();
    const {getFriendChatMessage, changeGroupLists, getFriendsLists, agreeGroupAdd} = api();

    onMounted(() => {
        const connect: HTMLElement | null = document.getElementById("stop");
        connect?.addEventListener("animationend", () => {
            if (connect) {
                requestAnimationFrame(() => {
                    connect.style.animation = "VVCanimation 0.5s infinite";
                });
            }
        })
    })

    // 打开语音通话界面
    const openVoiceCallWindow = async (): Promise<void> => {
        socket.emit("VCRoom", {
            from: usersLists().thisUserAccount >>> 0,
            to: this_chat_friend_data.value.iId,
            type: 0
        });

        try {
            window.electronAPI.openVoiceCallWindow();
        } catch (err) {
            window.open('http://localhost:5173/voiceCallWindow', '_blank');
        }
    }

    // 打开视频通话界面
    const openVideoCallWindow = (): void => {
        socket.emit("VCRoom", {
            from: usersLists().thisUserAccount >>> 0,
            to: this_chat_friend_data.value.iId,
            type: 1
        });

        try {
            window.electronAPI.openVideoWindow();
        } catch (err) {
            window.open('http://localhost:5173/videoCallWindow', '_blank');
        }
    }
    const openMoreWindow = (): void => {
        more_window.value = true;
    }

    const changeGroupName = (): void => {
        changeGroupLists(thisChatUsersIds.value.thisChatFriendId, "group_name", group_name.value)
            .then(() => {
                ElMessage({
                    message: '修改成功!',
                    type: 'success',
                    duration: 2000,
                })
            })
    }
    const changeGroupAnnouncement = (): void => {
        changeGroupLists(thisChatUsersIds.value.thisChatFriendId, "group_announcement", group_announcement.value)
            .then(() => {
                ElMessage({
                    message: '修改成功!',
                    type: 'success',
                    duration: 2000,
                })
            })
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

    // 粘贴
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
        let message: any;

        if (chat_partner.value) {
            message = new friend_chat_message(usersLists().thisUserAccount, this_chat_friend_data.value.iId, content.value);
            socket.emit("sendFriendMessage", message);
        } else {
            message = new group_chat_message(usersLists().thisUserAccount, this_chat_friend_data.value.gId, content.value, usersLists().thisUserNickname)
            socket.emit("sendGroupMessage", message);
        }

        content.value = "";
        allChatMessage.value.push(message);
        setTimeout(() => {
            const dialogBox = document.getElementById("dialogBox") as HTMLElement;
            dialogBox.scrollTo({top: dialogBox.scrollHeight, behavior: 'instant'});
        }, 150);
    }

    const enterSengMessage = (): void => {
        if (content.value) sendMessage();
        else ElMessage({
            message: '内容不可为空!!!',
            type: 'error',
            offset: 610,
        });
    }

    const getFriendChatAllMessage = (from_iid: number, to_iid: number, chatMessageNum: number, getPartner: string): void => {
        getFriendChatMessage(from_iid, to_iid, chatMessageNum, getPartner)
            .then((allMessage) => {
                allChatMessage.value = allMessage.data.reverse();
            })
            .then(() => {
                if (chatMessageNum == 30) {
                    const dialogBox = document.getElementById("dialogBox") as HTMLElement;
                    dialogBox.scrollTo({top: dialogBox.scrollHeight, behavior: 'instant'});
                }
            }).catch(console.error);
    }

    let chatMessageNum: number = 1;
    const scrollTopHeight = (): void => {
        const scrollTop = scroll_top_height.value.scrollTop;
        const dialogBox = document.getElementById("dialogBox") as HTMLElement;

        if (scrollTop <= 0) {
            const scrollButton_first: number = scroll_top_height.value.scrollHeight - scroll_top_height.value.scrollTop;

            chatMessageNum++;

            if (!chat_partner.value) {
                getFriendChatAllMessage(thisChatUsersIds.value.thisUserId, thisChatUsersIds.value.thisChatFriendId, chatMessageNum * 30, "getGroupChatMessage");
            } else {
                getFriendChatAllMessage(thisChatUsersIds.value.thisUserId, thisChatUsersIds.value.thisChatFriendId, chatMessageNum * 30, "getFriendChatMessage");
            }

            setTimeout((): void => {
                const scrollButton_second: number = scroll_top_height.value.scrollHeight - scrollButton_first;

                dialogBox.scrollTo({top: scrollButton_second, behavior: 'instant'});
            }, 100)
        }
    }

    const openOrDownloadFile = (): void => {
        const the_file = document.getElementById("file") as HTMLElement;
        the_file.click();
    }

    const watchVideo = (videoName: string | number, videoSrc: string): void => {
        window.electronAPI.watchVideo(videoName, videoSrc);
    }

    const groupAddUsers = () => {
        group_add_users.value = true;
        getFriendsLists(usersLists().thisUserAccount)
            .then((data) => {
                const a = new Set(group_users_lists.value.map((item: any) => item.iId));

                can_invited_add_group_users.value = data.data.result.filter((item: any) => !a.has(item.friend_iId));
            })
    }

    const inquireFriendsCanInvitedJoinGroup = () => {
        if (!group_add_users_inquire.value) groupAddUsers();
        else {
            can_invited_add_group_users.value = can_invited_add_group_users.value.filter((item: any) => {
                const friend_iIdStr = item.friend_iId.toString();

                return friend_iIdStr.includes(group_add_users_inquire.value) || item.friend_notes.includes(group_add_users_inquire.value);
            });
        }
    }

    const decideInviteYourFriends = async () => {
        group_add_users.value = false;
        for (let i: number = 0; i < selected_users.value.length; i++) {
            await agreeGroupAdd(selected_users.value[i].friend_iId, this_chat_friend_data.value.gId)
                .then(() => {
                    group_users_lists.value.push(selected_users.value)
                }).catch(console.error);
        }
    }

    const queryGroupUser = () => {
        if (look_more_group_users_inquire.value)
            group_users_lists.value = group_users_lists.value.filter((item: any) => item.nickname.includes(look_more_group_users_inquire.value));
        else {
            api().groupUserData(this_chat_friend_data.value.gId)
                .then(data => {
                    group_users_lists.value = data.data.flattenedUserLists;
                });
        }
    }

    socket.on("sendFriendMessage", (message: any): void => {
        if (usersLists().thisUserAccount === message.from_iid) allChatMessage.value.push(message);
        setTimeout(() => {
            const dialogBox = document.getElementById("dialogBox") as HTMLElement;
            dialogBox.scrollTo({top: dialogBox.scrollHeight, behavior: 'instant'});
        }, 100)
    })

    socket.on("chatUsersIds", (chatUsersIds: any): void => {
        thisChatUsersIds.value = chatUsersIds;
        chatMessageNum = 1;
        this_chat_friend_data.value = groupData().this_chat_friend_lists.value;

        if (this_chat_friend_data.value.group_name) {
            group_name.value = this_chat_friend_data.value.group_name;
            group_announcement.value = this_chat_friend_data.value.group_announcement;
            chat_partner.value = false;
            group_permissions.value = this_chat_friend_data.value.group_leader_iid != usersLists().thisUserAccount;

            api().groupUserData(this_chat_friend_data.value.gId)
                .then(data => {
                    group_users_lists.value = data.data.flattenedUserLists;
                });

            getFriendChatAllMessage(chatUsersIds.thisUserId, chatUsersIds.thisChatFriendId, chatMessageNum * 30, "getGroupChatMessage");
        } else {
            getFriendChatAllMessage(chatUsersIds.thisUserId, chatUsersIds.thisChatFriendId, chatMessageNum * 30, "getFriendChatMessage");
        }

        setTimeout(() => {
            const dialogBox = document.getElementById("dialogBox") as HTMLElement;
            dialogBox.scrollTo({top: dialogBox.scrollHeight, behavior: 'instant'});
        }, 50);
    })

    watch(content, (): void => {
        button_disabled.value = content.value !== "";
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
        selected_users,
        inviteUsersLists,
        look_more_group_users,
        look_more_group_users_inquire,
        copyText,
        pasteText,
        paste,
        copy_success,
        sendMessage,
        scroll_top_height,
        scrollTopHeight,
        this_chat_friend_data,
        allChatMessage,
        enterSengMessage,
        openOrDownloadFile,
        watchVideo,
        group_users_lists,
        groupAddUsers,
        decideInviteYourFriends,
        can_invited_add_group_users,
        inquireFriendsCanInvitedJoinGroup,
        queryGroupUser,
    }
}