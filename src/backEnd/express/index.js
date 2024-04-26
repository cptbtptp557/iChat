const nodemailer = require("nodemailer");
const email = require("./email/index");

const expressIndex = () => {
    const {email_lists, mailOptions} = email;

    // 发送验证码
    const sendCaptcha = RecipientEmail => {
        // 随机生成一个六位数验证码
        const captcha = Math.floor(100000 + Math.random() * 900000);
        const theMailOptions = new mailOptions(RecipientEmail, captcha);
        let transporter = nodemailer.createTransport(email_lists);

        transporter.sendMail(theMailOptions, (error) => {
            if (error) {
                console.error(error);
            }else {
                console.log("验证码发送成功!!!");
            }
        });
        return captcha;
    }

    return {
        sendCaptcha
    }
}

module.exports = expressIndex();

