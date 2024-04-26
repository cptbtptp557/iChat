const email = () => {
    const email_lists = {
        service: 'qq',
        port: 465,
        secureConnection: true,
        auth: {
            user: '1215758259@qq.com',
            pass: 'utrzzfztmkthhhce',
        }
    };

    class mailOptions {
        constructor(Recipient_email, captcha) {
            this.from = '1215758259@qq.com';
            this.to = Recipient_email;
            this.subject = '验证码';
            this.html = '<h1>验证码为: ' + captcha + '</h1>';
        }
    }

    return {
        email_lists,
        mailOptions,
    }
}

module.exports = email();