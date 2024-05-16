const mySqlQueryStatements = () => {
    const getUserLists_sql = 'select * from totalusers where iId = ';
    const login_sql = 'select password from totalusers where iId = ';

    const search_email = (email) => "select * from totalusers where mailbox = " + "'" + email + "'";
    const change_password = (email, newPassword) => "update totalusers set password =" + "'" + newPassword + "'" + " where mailbox = " + "'" + email + "'" + "";
    const change_onlinepresence_sql = (onlinepresence, iId) => 'update totalusers set onlinepresence =' + onlinepresence + ' where iId = ' + iId;
    const create_account_sql = (nickname, mailbox, password) => "insert into totalusers(nickname, mailbox, password, signature, gender, onlinepresence, birthday)values(" + "'" + nickname + "'" + ',' + "'" + mailbox + "'" + ',' + "'" + password + "'" + ",'展示更好的自己', 'man', false, '2000-01-01')";
    const change_user_lists_sql = (nickname, signature, gender, birthday, account) => "update totalusers set nickname = " + "'" + nickname + "', signature = " + "'" + signature + "' , gender =" + "'" + gender + "' , birthday =" + "'" + birthday + "' where iId =" + account;

    return {
        getUserLists_sql,
        login_sql,
        search_email,
        change_password,
        change_onlinepresence_sql,
        create_account_sql,
        change_user_lists_sql,
    }
};

module.exports = mySqlQueryStatements();