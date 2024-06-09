import {onMounted, ref} from "vue";
import {api} from "../../pinia/api.ts";
import {usersLists} from "../../pinia/usersLists.ts";

export const groupChatNotifications = () => {
    const group_notice = ref(); // 群通知列表

    // 同意添加群聊
    const agreeAdd = (lists: any) => {
        api().agreeGroupAdd(lists.from_iid, lists.group_gid)
            .then(() => {
                for (let i = 0; i < group_notice.value.length; i++) {
                    if (group_notice.value[i].from_iid === lists.from_iid && group_notice.value[i].group_gid === lists.group_gid) {
                        group_notice.value[i].add_status = 1;
                        break;
                    }
                }
            }).catch(console.error);
    }

    // 拒绝添加群聊
    const refuseAdd = (lists: any) => {
        api().refuseGroupAdd(lists.from_iid, lists.group_gid)
            .then(() => {
                for (let i = 0; i < group_notice.value.length; i++) {
                    if (group_notice.value[i].from_iid === lists.from_iid && group_notice.value[i].group_gid === lists.group_gid) {
                        group_notice.value[i].add_status = 2;
                        break;
                    }
                }
            }).catch(console.error);
    }

    onMounted(() => {
        api().getAddGroupRecording(usersLists().thisUserAccount)
            .then(data => {
                group_notice.value = data.data.result;
            }).catch(console.error);
    });

    return {
        group_notice,
        agreeAdd,
        refuseAdd,
    }
}