import {api} from "../../api";
import {ref} from "vue";

export const forgotPassword = () => {
    const to_email = ref(); // 接收方邮箱
    const new_password = ref(); //新设置的密码
    const captcha = ref(); // 验证码
    const input_captcha = ref(); // 输入的验证码
    const captcha_button_status = ref(false); // 获取验证码按钮状态
    const captcha_button_value = ref("获取验证码");
    const submit_status = ref(true); // 按钮状态
    const {uploadEmail} = api();

    const toEmail = async () => {
        let get_captcha_button = document.getElementById("get_captcha") as HTMLElement;

        await uploadEmail(to_email.value)
            .then(data => {
                captcha.value = data.data;
                captcha_button_status.value = true;
                submit_status.value = false;
                get_captcha_button.style.backgroundColor = "rgba(51, 96, 231, 0.5)";
            })
            .then(() => {
                let num: number = Number(captcha_button_value.value);
                num = 61;
                let interval = setInterval(() => {
                    num -= 1;
                    captcha_button_value.value = String(num);
                    if (num === 0) {
                        clearInterval(interval);
                        get_captcha_button.style.backgroundColor = "#4B70E2";
                        captcha.value = "";
                        captcha_button_status.value = false;
                        captcha_button_value.value = "获取验证码";
                        submit_status.value = true;
                    }
                },1000);


            })
    }

    const judgmentCaptcha = () => {
        if (input_captcha.value == captcha.value) {
            console.log("将新密码存入数据库!!!");
            window.location.href="/login";
        }else {
            alert("验证码输入错误!!!");
        }
    }


    return {
        to_email,
        toEmail,
        new_password,
        judgmentCaptcha,
        input_captcha,
        captcha_button_status,
        submit_status,
        captcha_button_value,
    }
}