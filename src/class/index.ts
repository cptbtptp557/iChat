export const classLists = () => {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let date = now.getDate();
    let formattedDate = `${year}/${('0' + month).slice(-2)}/${('0' + date).slice(-2)}`;

    // 添加好友、创建群聊
    class addUser {
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

    return {
        addUser,
    }
}