import {ref} from "vue";

export const friendsList = () => {
    const friends_lists = ref(true);
    const friend_signIn_status = ref(true);

    return {
        friends_lists,
        friend_signIn_status,
    }
}