import {ref} from "vue";
import {ElMessageBox, ElNotification} from "element-plus";
import {api} from "../../pinia/api.ts";

export const login = () => {
    const account = ref(); // 输入的账号
    const password = ref(); // 输入的密码
    const mailbox = ref(); // 输入的邮箱
    const nickname = ref(); // 输入的昵称

    const {login, createAccount} = api();
    const getButtons = (e: any) => e.preventDefault();

    const changeForm = () => {
        const switchCtn = document.querySelector("#switch-cnt");
        const switchC1 = document.querySelector("#switch-c1");
        const switchC2 = document.querySelector("#switch-c2");
        const switchCircle = ref(document.querySelectorAll(".switch__circle"));
        const aContainer = document.querySelector("#a-container");
        const bContainer = document.querySelector("#b-container");

        switchCtn?.classList.add("is-gx");
        setTimeout(function () {
            switchCtn?.classList.remove("is-gx");
        }, 1500);

        switchCtn?.classList.toggle("is-txr");
        switchCircle.value[0].classList.toggle("is-txr");
        switchCircle.value[1].classList.toggle("is-txr");

        switchC1?.classList.toggle("is-hidden");
        switchC2?.classList.toggle("is-hidden");
        aContainer?.classList.toggle("is-txl");
        bContainer?.classList.toggle("is-txl");
        bContainer?.classList.toggle("is-z200");
    }

    const mainF = () => {
        let allButtons = document.querySelectorAll(".submit");
        let switchBtn = document.querySelectorAll(".switch-btn");
        let i;

        for (i = 0; i < allButtons.length; i++) allButtons[i].addEventListener("click", getButtons);
        for (i = 0; i < switchBtn.length; i++) switchBtn[i].addEventListener("click", changeForm);
    }

    window.addEventListener("load", mainF);
    // 登录
    const loginIn = () => {
        let token: string;
        login(account.value, password.value)
            .then(data => {
                token = data.data;
                if (token) {
                    localStorage.token = token;
                    window.location.href = "/";
                } else {
                    ElNotification({
                        title: '账号密码错误',
                        message: '请重新输入!!!',
                        type: 'error',
                        position: 'top-left',
                    })
                }
            }).catch(console.error);
    };

    // 注册
    const createNewAccount = () => {
        if (nickname.value && mailbox.value && password.value.length >= 5 && password.value.length <= 12) {
            createAccount(nickname.value, mailbox.value, password.value)
                .then(data => {
                    console.log(data.data)
                    if (typeof data.data === "string") {
                        ElNotification({
                            message: data.data,
                            type: 'error',
                        })
                    }else {
                        ElMessageBox.alert(
                            '<strong>账号:</strong>' + data.data.iID + '<br>' +
                            '<strong>密码:</strong>' + data.data.data.password + '<br>' +
                            '<strong>邮箱:</strong>' + data.data.data.mailbox + '',
                            '请保存',
                            {
                                confirmButtonText: '确定',
                                draggable: true,
                                dangerouslyUseHTMLString: true,
                            }
                        )
                        password.value = '';
                    }
                }).catch(console.error);
        } else if (!password.value || password.value.length < 5 || password.value.length > 12) {
            ElNotification({
                title: 'Error',
                message: '密码长度应大于等于5位小于12位!!!',
                type: 'error',
            })
        } else {
            ElNotification({
                title: 'Error',
                message: '请输入!!!',
                type: 'error',
            })
        }
    };

    return {
        account,
        password,
        mailbox,
        nickname,
        loginIn,
        createNewAccount,
    }
}