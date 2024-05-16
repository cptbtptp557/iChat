const mysql = require("mysql");
const mySqlFunction = () => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3366',
        database: 'ichatdatabase',
    });

    connection.connect(err => {
        if (err) console.log("无法连接到数据库:", err);
        console.log("数据库连接成功!!!")
    });

    const sqlFunction = (sql) => {
        return new Promise((resolve, reject) => {
            connection.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result);
                }
            })
        });
    };

    return {
        sqlFunction,
    }
}

module.exports = mySqlFunction();