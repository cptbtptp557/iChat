export const classLists = () => {
    const get_addUser_mankind_time = (): string => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const date = now.getDate();

        return (`${year}/${('0' + month).slice(-2)}/${('0' + date).slice(-2)}`);
    }

    const get_create_new_group_time = (): string => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const date = now.getDate();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const second = now.getSeconds();
        const formattedDate = `${year}/${('0' + month).slice(-2)}/${('0' + date).slice(-2)}`;
        const messageDate = `${formattedDate} ${hours >= 10 ? hours : "0" + hours}:${minutes >= 10 ? minutes : "0" + minutes}:${second >= 10 ? second : "0" + second}`


        return (messageDate);
    }

    // 添加好友、创建群聊
    class addUser_mankind {
        from_iid: number; // 发起方iID
        to_iid: number; // 接收方iId
        from_name: string | number; // 发起方昵称
        to_notes: string | number; // 发起方给接收方的备注
        add_status: number; // 当前添加好友、创建群聊的消息的状态---0: 未选择, 1: 同意, 2: 拒绝
        add_time: string; // 发起添加好友、创建群聊的时间

        constructor(from_iid: number, to_iid: number, from_name: string | number, to_notes: string | number, add_status: number) {
            this.from_iid = from_iid;
            this.to_iid = to_iid;
            this.from_name = from_name;
            this.to_notes = to_notes;
            this.add_status = add_status;
            this.add_time = get_addUser_mankind_time();
        }
    }

    // 申请加入群聊
    class addUser_group {
        from_iid: number; // 发起方iID
        to_gid: number; // 群gId
        group_leader_iid: number; // 群主iId
        from_name: string | number; // 发起方昵称
        group_name: string | number; // 群昵称
        add_status: number; // 当前添加好友、创建群聊的消息的状态---0: 未选择, 1: 同意, 2: 拒绝
        add_time: string; // 发起申请加入群聊的时间

        constructor(from_iid: number, to_gid: number, group_leader_iid: number, from_name: string | number, group_name: string | number, add_status: number) {
            this.from_iid = from_iid;
            this.to_gid = to_gid;
            this.group_leader_iid = group_leader_iid;
            this.from_name = from_name;
            this.group_name = group_name;
            this.add_status = add_status;
            this.add_time = get_addUser_mankind_time();
        }
    }

    // 创建新群聊
    class create_new_group {
        group_name: string;
        group_announcement: string | number;
        group_leader_iid: number;
        add_user_iid: number[];

        constructor(group_name: string, group_leader_iid: number, add_user_iid: number[]) {
            this.group_name = group_name;
            this.group_announcement = "欢迎加入群聊!!!";
            this.group_leader_iid = group_leader_iid;
            this.add_user_iid = add_user_iid;
        }
    }

    // 好友消息信息
    class friend_chat_message {
        from_iid: number;
        to_iid: number;
        message: any;
        reading_status: number;
        send_time: string;

        constructor(from_iid: number, to_iid: number, message: any) {
            this.from_iid = from_iid;
            this.to_iid = to_iid;
            this.message = message;
            this.reading_status = 0;
            this.send_time = get_create_new_group_time();
        }
    }

    // 群聊消息信息
    class group_chat_message {
        from_iid: number;
        gId: number;
        message: any;
        reading_status: number;
        send_time: string;
        from_name: string;

        constructor(from_iid: number, gId: number, message: any, from_name: string) {
            this.from_iid = from_iid;
            this.gId = gId;
            this.message = message;
            this.reading_status = 0;
            this.send_time = get_create_new_group_time();
            this.from_name = from_name;
        }
    }

    return {
        addUser_mankind,
        addUser_group,
        create_new_group,
        friend_chat_message,
        group_chat_message,
    }
}