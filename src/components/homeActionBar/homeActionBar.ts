import message from "../chat/message.vue";
import friends from "../friends/friends.vue";
import raidenShogun from "../raidenShogun/raidenShogun.vue";
import {onMounted, ref} from "vue";
import {usersLists} from "../../pinia/usersLists.ts";
import {api} from "../../pinia/api.ts";
import {ElNotification} from "element-plus";

export const homeActionBar = () => {
    const userLists = ref(); // 登录账户信息
    const message_badge = ref(false); // 消息红点显示
    const userAccount = ref(); // 当前登陆账户账号
    const birthday = ref("2002-11-24"); // 生日
    const nickname = ref(); // 昵称
    const signature = ref(); // 个性签名
    const gender = ref(); // 性别

    const {signOut, getUserLists, changeUserLists} = api();

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
    };

    const toMessage = () => {
        selected('message');
        usersLists().current = message;
        usersLists().all_friends_show_components = raidenShogun;
    };

    const toFriends = () => {
        selected('friends');
        usersLists().current = friends;
    };

    const {inData} = usersLists();
    const goMessageHref = () => {
        const selected_one = document.getElementById("selected_one") as HTMLElement;
        const selected_two = document.getElementById("selected_two") as HTMLElement;

        selected_one.style.backgroundColor = "rgb(220, 220, 220)";
        selected_two.style.backgroundColor = "transparent";
        selected_one.style.borderRadius = "10px";
        inData(10001);
    };

    const commit = () => {
        changeUserLists(nickname.value, signature.value, gender.value, birthday.value, userAccount.value)
            .then(() => {
                ElNotification({
                    message: '修改成功!!!',
                    type: 'success',
                });
                location.reload();
            }).catch(console.error);
    };

    // 退出登录
    const signOutAccount = () => {
        let token = localStorage.getItem('token') as string;

        signOut(token)
            .then(() => {
                localStorage.removeItem('token');
                location.reload();
            }).catch(console.error);
    };

    onMounted(() => {
        let token = localStorage.getItem('token') as string;
        getUserLists(token)
            .then((data) => {
                userLists.value = data.data.result[0];
                nickname.value = data.data.result[0].nickname;
                signature.value = data.data.result[0].signature;
                birthday.value = data.data.result[0].birthday;
                gender.value = data.data.result[0].gender;
                userAccount.value = data.data.this_account;
                usersLists().thisUserAccount = data.data.this_account;
            }).catch(console.error);
    });

    return {
        message_badge,
        toMessage,
        toFriends,
        goMessageHref,
        userAccount,
        birthday,
        nickname,
        signature,
        gender,
        commit,
        signOutAccount,
    }
}