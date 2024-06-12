import {onActivated, ref} from "vue";
import {usersLists} from "../../../pinia/usersLists.ts";
import {ElMessageBox} from 'element-plus';

export const groupLists = () => {
    const group_lists = ref(usersLists().thisUserGroupLists); // 当前点击群聊数据
    // const group_user_lists = ref(); // 群成员名单
    const showAnnouncement = () => {
        ElMessageBox.alert(group_lists.value.group_announcement, '群公告', {
            draggable: true,
            showConfirmButton: false,
        })
    }

    document.addEventListener('click', () => {
        setTimeout(() => {
            group_lists.value = usersLists().thisUserGroupLists;
        }, 10)
    })

    onActivated(() => {
        group_lists.value = usersLists().thisUserGroupLists;
    });

    return {
        group_lists,
        showAnnouncement,
    }
}