const mySqlQueryStatements = () => {
    const getUserLists_sql = 'select * from totalusers where iId = 10001';
    const login_sql = 'select password from totalusers where iId = ';
    const create_account_sql = 'insert ()';

    const change_onlinepresence_sql = (onlinepresence, iId) => 'update totalusers set onlinepresence =' + onlinepresence + ' where iId = ' + iId;

    return {
        getUserLists_sql,
        login_sql,
        change_onlinepresence_sql,
        create_account_sql,
    }
};

module.exports = mySqlQueryStatements();