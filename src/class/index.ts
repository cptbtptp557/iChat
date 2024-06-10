export const classLists = () => {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let date = now.getDate();
    let formattedDate = `${year}/${('0' + month).slice(-2)}/${('0' + date).slice(-2)}`;

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
            this.add_time = formattedDate;
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
            this.add_time = formattedDate;
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

    return {
        addUser_mankind,
        addUser_group,
        create_new_group,
    }
}