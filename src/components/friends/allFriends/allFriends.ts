import {ref} from "vue";

export const allFriends = () => {
    const search_friend = ref(); // 好友搜索框

    // 查询好友---进行了防抖处理
    let timer: any;
    const searchFriend = () => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            if (search_friend.value) {
                console.log(search_friend.value);
            }
        }, 1500);
    }

    return {
        search_friend,
        searchFriend,
    }
}