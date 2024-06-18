const mySqlQueryStatements = () => {
    const getUserListsToiId_sql = (searchType, parameter, value) => {
        let this_parameter;

        if (typeof value === "string") this_parameter = "select * from " + searchType + " where " + parameter + " LIKE " + "'%" + value + "%'";
        else this_parameter = "select * from totalusers where " + parameter + " = " + value;
        return this_parameter;
    };

    const login_sql = 'select password from totalusers where iId = ';
    const search_email = (email) => "select * from totalusers where mailbox = " + "'" + email + "'";
    const change_password = (email, newPassword) => "update totalusers set password =" + "'" + newPassword + "'" + " where mailbox = " + "'" + email + "'" + "";
    const change_onlinepresence_sql = (onlinepresence, iId) => 'update totalusers set onlinepresence =' + onlinepresence + ' where iId = ' + iId;
    const create_account_sql = (nickname, mailbox, password) => "insert into totalusers(nickname, mailbox, password, signature, gender, onlinepresence, birthday) values (" + "'" + nickname + "'" + ',' + "'" + mailbox + "'" + ',' + "'" + password + "'" + ",'展示更好的自己', 'man', false, '2000-01-01')";
    const change_user_lists_sql = (nickname, signature, gender, birthday, account) => "update totalusers set nickname = " + "'" + nickname + "', signature = " + "'" + signature + "' , gender =" + "'" + gender + "' , birthday =" + "'" + birthday + "' where iId =" + account;
    const add_recording = (from_iId, to_iId, from_name, to_notes, add_status, add_time) => "insert into addto(from_iid, to_iid, from_name, to_notes, add_status, add_time) values ('" + from_iId + "', '" + to_iId + "', '" + from_name + "','" + to_notes + "'," + add_status + ",'" + add_time + "')";
    const add_group_recording = (from_iid, group_gid, group_name, add_status, add_time, group_leader_iid, group_user_name) => "insert into groupaddto(from_iid,group_gid,group_name,add_status,add_time,group_leader_iid,group_user_name) values (" + from_iid + "," + group_gid + ",'" + group_name + "'," + add_status + ",'" + add_time + "'," + group_leader_iid + ",'" + group_user_name + "')";
    const get_add_recording = (to_iId) => "select * from addto where to_iId = " + to_iId + " order by add_time desc";
    const get_add_group_recording = (group_leader_iid) => "select * from groupaddto where group_leader_iid = " + group_leader_iid + " order by add_time desc";
    const agree_add_request = (from_iId, to_iId, from_name, to_notes) => "insert into friendlists values (" + from_iId + "," + to_iId + ",'" + to_notes + "'), (" + to_iId + "," + from_iId + ",'" + from_name + "')";
    const refuse_add_request = (from_iId, to_iId) => "update addto set add_status = 2 where from_iid = " + from_iId + " and to_iid = " + to_iId;
    const change_add_status = (from_iId, to_iId) => "update addto set add_status = 1 where from_iid = " + from_iId + " and to_iid = " + to_iId;
    const get_friends_number = (iId) => "select * from friendlists where iId = " + iId;
    const create_group = (group_name, group_leader_iid, group_announcement) => "insert into grouplists(group_name, group_leader_iid, group_announcement) values ('" + group_name + "','" + group_leader_iid + "','" + group_announcement + "')";
    const revise_group_status = (status, gid, iid) => "update groupaddto set add_status = " + status + " where from_iid = " + iid + " and group_gid = " + gid;
    const friend_add_group = (gid, iid) => "insert into groupmembers(gid, iid) values (" + gid + ", " + iid + ")";
    const all_inside_group_lists = (iid) => "select gid from groupmembers where iid = " + iid;
    const get_group_data = (gid) => "select * from grouplists where gId = " + gid;
    const get_group_user_data = (gid) => "select iid from groupmembers where gid = " + gid;
    const add_friend_chat_message = (from_iid, to_iid, message, reading_status, send_time) => "insert into friendchatmessage(from_iid, to_iid, message, reading_status, send_time) values (" + from_iid + "," + to_iid + ",'" + message + "', " + reading_status + ",'" + send_time + "' )";
    const get_friend_chat_user_data = (account_iid) => "with RankedMessages as ( select *, row_number() over(partition by to_iid order by send_time desc) as rn from friendchatmessage where from_iid = " + account_iid + " or to_iid = " + account_iid + ") select * from RankedMessages where rn = 1 order by send_time desc;";
    const get_friend_chat_message = (from_iid, to_iid, records_num) => "select * from friendchatmessage where (from_iid = " + from_iid + " and to_iid = " + to_iid + ") or (from_iid = " + to_iid + " and to_iid = " + from_iid + ") order by send_time asc limit " + records_num;
    const get_reading_status_lists = (from_iid) => "select * from friendchatmessage where reading_status = 0 and to_iid = " + from_iid;
    const change_message_status = (from_iid, to_iid) => "update friendchatmessage set reading_status = 1 where from_iid = " + from_iid + " and to_iid = " + to_iid;

    return {
        getUserListsToiId_sql,
        login_sql,
        search_email,
        change_password,
        change_onlinepresence_sql,
        create_account_sql,
        change_user_lists_sql,
        add_recording,
        add_group_recording,
        get_add_recording,
        get_add_group_recording,
        agree_add_request,
        refuse_add_request,
        change_add_status,
        get_friends_number,
        create_group,
        revise_group_status,
        friend_add_group,
        all_inside_group_lists,
        get_group_data,
        get_group_user_data,
        add_friend_chat_message,
        get_friend_chat_user_data,
        get_friend_chat_message,
        get_reading_status_lists,
        change_message_status,
    }
};

module.exports = mySqlQueryStatements();