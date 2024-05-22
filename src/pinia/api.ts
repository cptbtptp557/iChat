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

    // 退出登录
    const signOut = async (token: string) => {
        return await axios.post('http://127.0.0.1:3000/signOut', '', {
            params: {
                'token': token,
            }
        })
    }

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
    };

    // 获取登录用户信息
    const getLoginUserLists = async (token: string) => {
        return await axios.get('http://127.0.0.1:3000/getUserLists', {
            params: {
                'searchType': 'totalusers',
                'parameter': 'iId',
                'token': token,
            }
        })
    };

    // 获取用户信息
    const getUserLists = async (search_type: string, value: number | string) => {
        let this_parameter;

        if (search_type === 'totalusers') {
            if (!isNaN(Number(value))) this_parameter = 'iId';
            else this_parameter = 'nickname';
        } else if (search_type === 'grouplists') {
            if (!isNaN(Number(value))) this_parameter = 'gId';
            else this_parameter = 'group_name';
        }

        return await axios.get('http://127.0.0.1:3000/getUserLists', {
            params: {
                'searchType': search_type,
                'parameter': this_parameter,
                'value': value,
            }
        })
    };

    // 修改用户信息
    const changeUserLists = async (nickname: number, signature: string | number, gender: string, birthday: string, account: number) => {
        return await axios.post('http://127.0.0.1:3000/changeUserLists', '', {
            params: {
                'nickname': nickname,
                'signature': signature,
                'gender': gender,
                'birthday': birthday,
                'account': account,
            }
        })
    };

    // 获取添加、加入、邀请好友或群聊记录
    const getAddRecording = async (to_iId: number) => {
        return await axios.get('http://127.0.0.1:3000/getAddRecording', {
            params: {
                'to_iId': to_iId,
            }
        })
    };

    // 同意添加申请
    const agreeAddRequest = async (from_iId: number, to_iId: number, from_name: number | string, to_notes: number | string) => {
        return await axios.get('http://127.0.0.1:3000/agreeAddRequest', {
            params: {
                'from_iId': from_iId,
                'to_iId': to_iId,
                'from_name': from_name,
                'to_notes': to_notes,
            }
        })
    }

    // 拒绝添加申请
    const refuseAddRequest = async (from_iId: number, to_iId: number) => {
        return await axios.get('http://127.0.0.1:3000/refuseAddRequest', {
            params: {
                'from_iId': from_iId,
                'to_iId': to_iId,
            }
        })
    }

    // 获取好友列表信息
    const getFriendsLists = async (iId: number) => {
        return await axios.get('http://127.0.0.1:3000/getFriendsLists', {
            params: {
                'iId': iId,
            }
        })
    }

    return {
        login,
        createAccount,
        changePassword,
        signOut,
        getLoginUserLists,
        changeUserLists,
        getUserLists,
        getAddRecording,
        agreeAddRequest,
        refuseAddRequest,
        getFriendsLists,
    }
})