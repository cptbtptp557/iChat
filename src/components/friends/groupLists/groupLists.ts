import {onMounted, ref} from "vue";
import {usersLists} from "../../../pinia/usersLists.ts";

export const groupLists = () => {
    const theGroupLists = ref(123); // 当前点击群聊数据

    onMounted(() => {
        theGroupLists.value = usersLists().thisUserGroupLists;
    })
    return {
        theGroupLists,
    }
}