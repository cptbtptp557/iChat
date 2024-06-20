import OSS from "ali-oss";
import {uuid} from "../tool/uuid";
import {groupData} from "../pinia/groupData.ts";
import {classLists} from "../class";
import {usersLists} from "../pinia/usersLists.ts";
import socket from "../socket";

export const oss = () => {
    const {getUuid} = uuid();
    const {friend_chat_message} = classLists();

    const client: OSS = new OSS({
        accessKeyId: 'LTAI5tGxPZ3hn1rbGVuyRdoQ',
        accessKeySecret: '4BIHxXF56YRZCAJTRUvGEgg9G0DtqG',
        region: 'oss-cn-shenzhen',
        bucket: 'ichatimage',
    })

    const getFile = async (event: any) => {
        await client.put(getUuid(10, 16), event.target.files[0])
            .then((result: any): void => {
                groupData().this_file_lists.value = event.target.files[0].type;
                console.log('图片上传成功', result);
                console.log(event.target.files[0])
                const fileMessage: string = groupData().this_file_lists.value + "|" + result.url;

                sendFile(fileMessage)
            }).catch(console.error);
    }

    const sendFile = (fileMessage: string) => {
        const message = new friend_chat_message(usersLists().thisUserAccount, groupData().this_chat_friend_lists.value.iId, fileMessage);
        console.log(message)
        socket.emit("sendFriendMessage", message);
    }

    return {
        getFile,
    }
}