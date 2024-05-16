import {defineStore} from "pinia";
import axios from "axios";


export const api = defineStore('api', () => {
    // 登录
    const login = async (account: number, password: number | string) => {
        return await axios.get('http://127.0.0.1:3000/login', {
            params: {
                'account': account,
                'password': password,
            }
        })
    };

    // 注册
    const createAccount = async (nickname: string | number, mailbox: string, password: string | number) => {
        return await axios.post('http://127.0.0.1:3000/createAccount', '', {
            params: {
                'nickname': nickname,
                'mailbox': mailbox,
                'password': password,
            }
        })
    };

    // 修改密码
    const changePassword = async (email: string, new_password: number | string) => {
        return await axios.post('http://127.0.0.1:3000/changePassword', '', {
            params: {
                'email': email,
                'new_password': new_password,
            }
        })
    }

    return {
        login,
        createAccount,
        changePassword,
    }
})