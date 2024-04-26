const express = require("express");
const expressIndex = require("./express/index");

const port = 3000;
const app = express();
const {sendCaptcha} = expressIndex;

// 跨域
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// 发送验证码
app.post("/captcha", (req, res) => {
    try {
        res.json(sendCaptcha(req.query.to_email));
    } catch (err) {
        console.error(err);
    }
});

app.listen(port, () => {
    console.log(`服务器在端口${port}上运行!!!`);
});