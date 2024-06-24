import OSS from "ali-oss";
import {ref} from "vue";
import {uuid} from "../tool/uuid";
import {groupData} from "../pinia/groupData.ts";
import {classLists} from "../class";
import {usersLists} from "../pinia/usersLists.ts";
import socket from "../socket";

export const oss = () => {
    const upload_progress = ref();

    const {getUuid} = uuid();
    const {friend_chat_message} = classLists();

    const client: OSS = new OSS({
        accessKeyId: import.meta.env.VITE_ACCESSKEYID,
        accessKeySecret: import.meta.env.VITE_ACCESSKEYSECRET,
        region: 'oss-cn-shenzhen',
        bucket: 'ichatimage',
        timeout: 60 * 1000 * 10,
    });

    const options = {
        progress: (progress: number) => {
            console.log(progress * 100 + "%");
            upload_progress.value = progress * 100;
        },
        parallel: 4,
        partSize: 1024 * 1024,
    };

    const getFile = async (event: any) => {
        const change_parallel: number = event.target.files[0].size / options.partSize;
        options.parallel = change_parallel < 1 ? 1 : Math.round(change_parallel);

        await client.multipartUpload(getUuid(15, 16), event.target.files[0], {...options})
            .then((result: any): void => {
                groupData().this_file_lists.value = event.target.files[0].type;
                const fileMessage: string = groupData().this_file_lists.value + "|" + result.res.requestUrls[0].split('?uploadId=')[0] + "|" + event.target.files[0].name + "|" + event.target.files[0].size;
                sendFile(fileMessage);
            }).catch(console.error);
    }

    const sendFile = (fileMessage: string) => {
        const message = new friend_chat_message(usersLists().thisUserAccount, groupData().this_chat_friend_lists.value.iId, fileMessage);

        socket.emit("sendFriendMessage", message);
    }

    return {
        getFile,
        upload_progress,
    }
}