const mySqlQueryStatements = () => {
    const getUserLists_sql = 'select * from totalusers where iId = 10001';
    const login_sql = 'select password from totalusers where iId = ';

    const search_email = (email) => "select * from totalusers where mailbox = " + "'" + email + "'";
    const change_password = (email, newPassword) => "update totalusers set password =" + "'" + newPassword + "'" + " where mailbox = " + "'" + email + "'" + "";
    const change_onlinepresence_sql = (onlinepresence, iId) => 'update totalusers set onlinepresence =' + onlinepresence + ' where iId = ' + iId;
    const create_account_sql = (nickname, mailbox, password) => "insert into totalusers(nickname, mailbox, password, signature, gender, onlinepresence)values(" + "'" + nickname + "'" + ',' + "'" + mailbox + "'" + ',' + "'" + password + "'" + ",'展示更好的自己', 'man', false)";


    return {
        getUserLists_sql,
        login_sql,
        search_email,
        change_password,
        change_onlinepresence_sql,
        create_account_sql,
    }
};

module.exports = mySqlQueryStatements();