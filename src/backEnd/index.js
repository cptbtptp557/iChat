const express = require("express");
const bodyParser = require('body-parser');
const expressIndex = require("./express/index");
const jwt = require("jsonwebtoken");
const mySqlQueryStatements = require("./mySql/mySqlQueryStatements");
const mySqlFunction = require("./mySql/mySqlFunction");

const port = 3000;
const app = express();
const {sendCaptcha} = expressIndex;
const {getUserLists_sql, login_sql, change_onlinepresence_sql} = mySqlQueryStatements;
const {getFunction} = mySqlFunction;

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
    try {
        res.json(sendCaptcha(req.query.to_email));
    } catch (err) {
        console.error(err);
    }
});

// 获取用户数据
app.get('/getUserLists', (req, res) => {
    getFunction(getUserLists_sql)
        .then(result => {
            res.setHeader('Content-Type', 'application/json');
            res.json(result);
        })
});

// 登录
app.get('/login', (req, res) => {
    const data = req.query;

    getFunction(login_sql + data.username)
        .then(result => {
            if (data.password === result[0].password) {
                const token = jwt.sign({
                    exp: Math.floor((Date.now() / 1000) + 86400),
                    thisAccount: data.username,
                }, data.username);
                res.json(token);
            } else {
                res.json(null);
                res.status(401).json({err: '账号或密码出错'});
            }
        })
        .then(() => {
            getFunction(change_onlinepresence_sql("true", data.username))
                .catch(console.error);
        })
        .catch(err => {
            res.json(null);
            console.error(err);
        });
});


app.listen(port, () => {
    console.log(`服务器在端口${port}上运行!!!`);
});