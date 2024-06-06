import {ref, watch} from "vue";
import {classLists} from "../../../class";
import {usersLists} from "../../../pinia/usersLists.ts";
import {api} from "../../../pinia/api.ts";
import {ElMessage} from 'element-plus';
import socket from "../../../socket";


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
    const selected_users = ref([]); // 邀请加入群聊的好友
    const loading = ref(false);

    const {addUser_mankind, addUser_group} = classLists();
    const {getUserLists, getFriendsLists} = api();

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
                        console.log(data.data)
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

    const inviteUsersLists = (): void => {
        console.log(selected_users.value)
    }

    // 申请添加---添加人类
    const addFriend = (confirm_add_friend_lists: any): void => {
        const add_user = new addUser_mankind(usersLists().thisUserAccount, confirm_add_friend_lists.iId, introduce_yourself.value, receiver_remarks.value, 0);
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
    const addGroup = (confirm_add_friend_lists: any): void => {
        console.log(typeof confirm_add_friend_lists)
        const add_user = new addUser_group(usersLists().thisUserAccount, confirm_add_friend_lists.gId, introduce_yourself.value, 0);
        console.log(add_user);
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

    const createGroup = () => {
        create_group.value = true;
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
        create_group.value = false;
        selected_users.value = [];

        console.log(selected_users.value)
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
        inviteUsersLists,
        addFriend,
        addGroup,
        loading,
        createGroup,
        addFriendFrame,
        inquire,
        createGroupSure,
    }
}