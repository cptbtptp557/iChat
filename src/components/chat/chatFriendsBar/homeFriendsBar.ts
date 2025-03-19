import {ref, watch} from "vue";
import {classLists} from "../../../class";
import {usersLists} from "../../../pinia/usersLists.ts";
import {groupData} from "../../../pinia/groupData.ts";
import {api} from "../../../pinia/api.ts";
import {ElMessage, ElNotification} from 'element-plus';
import socket from "../../../socket";
import chatChatBar from "../chatChatBar/homeChatBar.vue";

export const homeFriendsBar = () => {
    const add_friend = ref(false); // 添加好友框
    const find_logotype = ref(); // 添加好友内输入的内容
    const query_results = ref(); // 查询出的好友、群聊
    const search_type = ref("totalusers"); // 搜索类型---用户、群聊
    const confirm_add_friend = ref(false); // 确认添加好友框
    const confirm_add_friend_lists = ref(); // 确认添加好友数据
    const introduce_yourself = ref("发起方昵称"); // 添加好友时的自我介绍
    const receiver_remarks = ref("给被添加方的备注"); // 添加好友时给被添加方的备注
    const create_group = ref(false); // 创建群聊窗口
    const group_add_users_inquire = ref(); // 邀请好友加入群聊时的查询输入字段
    const this_user_friends = ref(); // 当前账户拥有的好友
    const selected_users = ref(); // 邀请加入群聊的好友
    const loading = ref(false);
    const friendsChatUserData = ref(); // 聊天好友列表
    const user_background = ref(); // 被聊天对象背景颜色
    const unreadNum = ref(); // 未读消息数目
    const this_chat_user_iId = ref(); // 当前聊天对象iId
    const search_friends_chatted = ref() // 搜索已聊天好友

    const {addUser_mankind, addUser_group, create_new_group} = classLists();
    const {getUserLists, getFriendsLists, createGroup, getFriendChatUserData, changeMessageStatus} = api();

    let timer: any;
    const find = () => {
        loading.value = true;
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            if (find_logotype.value) {
                getUserLists(search_type.value, find_logotype.value)
                    .then(data => {
                        query_results.value = data.data.result;
                        loading.value = false;
                    }).catch(console.error);
            }
        }, 1500);
        if (!find_logotype.value) loading.value = false;
    }

    const empty = () => {
        find_logotype.value = "";
    }

    const changeBorder = (even: any) => {
        const user = document.getElementById("user") as HTMLElement
        const group_chats = document.getElementById("group_chats") as HTMLElement;

        if (even.srcElement.__vnode.children === "用户") {
            user.style.borderColor = "#4B70E2FF";
            user.style.color = "#4B70E2FF";
            group_chats.style.borderColor = "transparent";
            group_chats.style.color = "#000";
            search_type.value = "totalusers";
            find();
        }
        if (even.srcElement.__vnode.children === "群聊") {
            user.style.borderColor = "transparent";
            user.style.color = "#000";
            group_chats.style.borderColor = "#4B70E2FF";
            group_chats.style.color = "#4B70E2FF";
            search_type.value = "grouplists";
            find();
        }
    }

    const confirmAddFriend = (lists: any) => {
        confirm_add_friend.value = true;
        confirm_add_friend_lists.value = lists;
        receiver_remarks.value = confirm_add_friend_lists.value.nickname;
        introduce_yourself.value = usersLists().thisUserNickname;
    }

    // 申请添加---添加用户
    const addFriend = (userLists: any): void => {
        const add_user = new addUser_mankind(usersLists().thisUserAccount, userLists.iId, introduce_yourself.value, receiver_remarks.value, 0);
        socket.emit("add", add_user);
        socket.on('add_lists', (addLists) => {
            if (addLists === 'true') {
                confirm_add_friend.value = false;
                ElMessage({
                    message: '申请成功!!!',
                    type: 'success',
                })
            }
        });
    };

    // 申请添加---添加群聊
    const addGroup = (groupLists: any): void => {
        const add_user = new addUser_group(usersLists().thisUserAccount, groupLists.gId, groupLists.group_leader_iid, introduce_yourself.value, groupLists.group_name, 0);
        socket.emit("add", add_user);
        socket.on('add_lists', (addLists) => {
            if (addLists === 'true') {
                confirm_add_friend.value = false;
                ElMessage({
                    message: '申请成功!!!',
                    type: 'success',
                })
            }
        });
    }

    const createNewGroup = () => {
        create_group.value = true;
        selected_users.value = [];
        getFriendsLists(usersLists().thisUserAccount)
            .then(data => {
                this_user_friends.value = data.data.result;
            }).catch(console.error);
    }

    const addFriendFrame = () => {
        add_friend.value = true;
        find_logotype.value = '';
    }

    const inquire = () => {
        let inquire_people = [];
        let regular = new RegExp(group_add_users_inquire.value);

        for (let i = 0; i < this_user_friends.value.length; i++) {
            if (this_user_friends.value[i].friend_notes.match(regular)) {
                inquire_people.push(this_user_friends.value[i]);
            }
        }
        this_user_friends.value = inquire_people;
    }

    const createGroupSure = () => {
        let group_name: string = "";
        let add_user_iid: number[] = [];
        for (let i = 0; i < 3; i++) {
            if (i < 2) group_name += selected_users.value[i].friend_notes + ",";
            else group_name += selected_users.value[i].friend_notes + "的群聊";
        }
        selected_users.value.forEach((proxy: any) => {
            add_user_iid.push(proxy.friend_iId);
        })
        add_user_iid.push(usersLists().thisUserAccount);

        const new_group_lists = new create_new_group(group_name, usersLists().thisUserAccount, add_user_iid);
        createGroup(new_group_lists)
            .then(() => {
                create_group.value = false;
                ElNotification({
                    title: '创建成功',
                    type: 'success',
                })
            })
            .catch(() => {
                ElNotification({
                    title: '创建失败',
                    type: 'error',
                })
            })
    }

    const getAllMessage = (thisAccountId: number, to_iid: number, friends_lists: any, index: number, chat_partner: boolean) => {
        const thisUserId: number = (usersLists().thisUserAccount >>> 0);
        const thisChatFriendId: number = thisUserId == thisAccountId ? to_iid : thisAccountId;

        user_background.value = index;
        if (!chat_partner) {
            socket.emit("chatUsersIds", {
                type: 'friend',
                thisUserId: thisUserId,
                thisChatFriendId: thisChatFriendId,
            });
        } else {
            socket.emit("chatUsersIds", {
                type: 'group',
                thisUserId: thisUserId,
                thisChatFriendId: to_iid,
            });
        }
        groupData().chat_page.value = chatChatBar;
        groupData().this_chat_friend_lists.value = friends_lists;

        this_chat_user_iId.value = thisAccountId;
        unreadNum.value.set(thisAccountId, []);
    }

    const getAboutMessageData = (account_iId: number) => {
        getFriendChatUserData(account_iId)
            .then((friendChatUserData_one) => {
                const unReadCount = new Map();

                friendsChatUserData.value = friendChatUserData_one.data;
                friendsChatUserData.value.unreadNum.forEach((message: any) => {
                    if (!unReadCount.has(message.from_iid)) {
                        unReadCount.set(message.from_iid, 1);
                    } else {
                        let count: number = unReadCount.get(message.from_iid);

                        unReadCount.set(message.from_iid, ++count)
                    }
                });
                unreadNum.value = unReadCount;
            })
    }

    const searchFriendsChatted = () => {
        let chang_massage: any[] = [];
        
        if (search_friends_chatted.value) {
            friendsChatUserData.value.flattenedUserLists = friendsChatUserData.value.flattenedUserLists.filter((item: any) => {
                return (
                    item.nickname?.includes(search_friends_chatted.value) || // 检查nickname是否包含c
                    item.group_name?.includes(search_friends_chatted.value) || // 检查group_name是否包含c
                    item.iId?.toString().includes(search_friends_chatted.value) || // 检查iId是否包含c
                    item.gId?.toString().includes(search_friends_chatted.value) // 检查gId是否包含c
                );
            })

            friendsChatUserData.value.flattenedUserLists.forEach((item1: any) => {
                friendsChatUserData.value.friendChatUserData.forEach((item2: any) => {
                    if (item1.iId && !item2.gid && (item1.iId === item2.from_iid || item1.iId === item2.to_iid)) chang_massage.push(item2);
                    else if (item1.gId && item1.gId === item2.gid) chang_massage.push(item2);
                });
            })
            friendsChatUserData.value.friendChatUserData = chang_massage;
        } else getAboutMessageData(usersLists().thisUserAccount);
    }

    watch(find_logotype, () => {
        if (find_logotype.value === '') query_results.value = '';
    });
    watch(group_add_users_inquire, () => {
        if (group_add_users_inquire.value === '') {
            getFriendsLists(usersLists().thisUserAccount)
                .then(data => {
                    this_user_friends.value = data.data.result;
                }).catch(console.error);
        }
    });

    socket.on("friendChatUserData", (thisAccountId) => {
        getAboutMessageData(thisAccountId);
    })

    socket.on("updateNewMessage", (thisAccountId) => {
        unreadNum.value.set(this_chat_user_iId.value, []);

        getAboutMessageData(thisAccountId);
    })
    socket.on("sendFriendMessage", (message) => {
        getAboutMessageData(message.to_iid);
        setTimeout(() => {
            if (groupData().chat_page.value === chatChatBar) {
                unreadNum.value.set(this_chat_user_iId.value, []);
                changeMessageStatus(usersLists().thisUserAccount, this_chat_user_iId.value)
            }
        }, 100);
    })

    return {
        add_friend,
        find,
        find_logotype,
        query_results,
        empty,
        changeBorder,
        confirm_add_friend,
        confirm_add_friend_lists,
        confirmAddFriend,
        introduce_yourself,
        receiver_remarks,
        create_group,
        group_add_users_inquire,
        this_user_friends,
        selected_users,
        addFriend,
        addGroup,
        loading,
        createNewGroup,
        addFriendFrame,
        inquire,
        createGroupSure,
        friendsChatUserData,
        getAllMessage,
        user_background,
        unreadNum,
        search_friends_chatted,
        searchFriendsChatted,
    }
}