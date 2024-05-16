const express = require("express");
const bodyParser = require('body-parser');
const expressIndex = require("./express/index");
const jwt = require("jsonwebtoken");
const mySqlQueryStatements = require("./mySql/mySqlQueryStatements");
const mySqlFunction = require("./mySql/mySqlFunction");

const port = 3000;
const app = express();
const {sendCaptcha} = expressIndex;
const {sqlFunction} = mySqlFunction;
const {
    getUserLists_sql,
    login_sql,
    search_email,
    change_onlinepresence_sql,
    create_account_sql,
    change_password,
} = mySqlQueryStatements;

// 跨域
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// 解析请求体数据
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// 发送验证码
app.post("/captcha", (req, res) => {
    const data = req.query;

    try {
        res.json(sendCaptcha(data.to_email));
    } catch (err) {
        console.error(err);
    }
});

// 获取用户数据
app.get('/getUserLists', (req, res) => {
    sqlFunction(getUserLists_sql)
        .then(result => {
            res.setHeader('Content-Type', 'application/json');
            res.json(result);
        })
});

// 登录
app.get('/login', (req, res) => {
    const data = req.query;

    sqlFunction(login_sql + data.account)
        .then(result => {
            if (data.password === result[0].password) {
                const token = jwt.sign({
                    exp: Math.floor((Date.now() / 1000) + 86400),
                    thisAccount: data.account,
                }, data.account);
                res.json(token);
            } else {
                res.json(null);
                res.status(401).json({err: '账号或密码出错'});
            }
        })
        .then(() => {
            sqlFunction(change_onlinepresence_sql("true", data.account))
                .catch(console.error);
        })
        .catch(err => {
            res.json(null);
            console.error(err);
        });
});

// 注册
app.post('/createAccount', (req, res) => {
    const data = req.query;
    const warn = "此邮箱已绑定!!!";

    sqlFunction(search_email(data.mailbox))
        .then((result) => {
            if (result.length !== 0) {
                res.json(warn);
            } else {
                sqlFunction(create_account_sql(data.nickname, data.mailbox, data.password))
                    .then(result => {
                        const iID = result.insertId;
                        res.json({data, iID});
                    }).catch(console.error)
            }
        }).catch(console.error);
})

// 修改密码
app.post('/changePassword', (req, res) => {
    const data = req.query;
    console.log(data)

    sqlFunction(change_password(data.email, data.new_password))
        .then(result => {
            console.log(result)
            res.json("密码修改成功!!!")
        })
})

app.listen(port, () => {
    console.log(`服务器在端口${port}上运行!!!`);
});