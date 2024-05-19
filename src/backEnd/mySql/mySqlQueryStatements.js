const mySqlQueryStatements = () => {
    const getUserListsToiId_sql = (searchType, parameter, value) => {
        let this_parameter;

        if (typeof value === "string") this_parameter = "select * from " + searchType + " where " + parameter + " = " + "'" + value + "'";
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
    const get_add_recording = (to_iId) => "select * from addto where to_iId = " + to_iId;
    return {
        getUserListsToiId_sql,
        login_sql,
        search_email,
        change_password,
        change_onlinepresence_sql,
        create_account_sql,
        change_user_lists_sql,
        add_recording,
        get_add_recording,
    }
};

module.exports = mySqlQueryStatements();