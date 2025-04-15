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

    // 获取添加、加入、邀请好友记录
    const getAddRecording = async (to_iId: number) => {
        return await axios.get('http://127.0.0.1:3000/getAddRecording', {
            params: {
                'to_iId': to_iId,
            }
        })
    };

    // 获取加入、邀请好友进入群聊记录
    const getAddGroupRecording = async (group_leader_iid: number) => {
        return await axios.get('http://127.0.0.1:3000/getAddGroupRecording', {
            params: {
                'group_leader_iid': group_leader_iid,
            }
        })
    }

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

    // 创建群聊
    const createGroup = async (new_group_lists: any) => {
        return await axios.post('http://127.0.0.1:3000/createGroup', new_group_lists, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    // 同意群聊申请
    const agreeGroupAdd = async (from_iid: number, group_gid: number) => {
        return await axios.post('http://127.0.0.1:3000/agreeGroupAdd', '', {
            params: {
                'iid': from_iid,
                'gid': group_gid,
            }
        })
    }

    // 拒绝群聊申请
    const refuseGroupAdd = async (from_iid: number, group_gid: number) => {
        return await axios.post('http://127.0.0.1:3000/refuseGroupAdd', '', {
            params: {
                'iid': from_iid,
                'gid': group_gid,
            }
        })
    }

    // 获取所有所在群聊名单
    const allInsideGroupLists = async (iid: number) => {
        return await axios.get('http://127.0.0.1:3000/allInsideGroupLists', {
            params: {
                'iid': iid,
            }
        })
    }

    // 获取群聊成员信息
    const groupUserData = async (gid: number) => {
        return await axios.get('http://127.0.0.1:3000/groupUserData', {
            params: {
                'gid': gid,
            }
        })
    }

    // 获取好友聊天列表数据
    const getFriendChatUserData = async (account_iid: number) => {
        return await axios.get('http://127.0.0.1:3000/getFriendChatUserData', {
            params: {
                'account_iid': account_iid
            }
        })
    }

    // 获取好友聊天记录
    const getFriendChatMessage = async (from_iid: number, to_iid: number, chatMessageNum: number, getPartner: string) => {
        return await axios.get(`http://127.0.0.1:3000/${getPartner}`, {
            params: {
                'from_iid': from_iid,
                'to_iid': to_iid,
                'chatMessageNum': chatMessageNum,
            }
        })
    }

    // 修改消息阅读状态
    const changeMessageStatus = async (from_iid: number, to_iid: number) => {
        return await axios.post('http://127.0.0.1:3000/changeMessageStatus', '', {
            params: {
                'from_iid': from_iid,
                'to_iid': to_iid,
            }
        })
    }

    // 获取群聊成员信息
    const getGroupUsersLists = async (gId: number) => {
        return await axios.get('http://127.0.0.1:3000/getGroupUsersLists', {
            params: {
                'gId': gId,
            }
        })
    }

    // 修改群聊名称或公告
    const changeGroupLists = async (gId: number, object_modified: string, change_data: string | number) => {
        return await axios.post('http://127.0.0.1:3000/changeGroupLists', '', {
            params: {
                'gId': gId,
                'object_modified': object_modified,
                'change_data': change_data,
            }
        })
    }

    // 获取初始头像file
    const getInitialAvatarFile = async () => {
        let defaultImageInformation;

        await axios.get('https://cptbtptp2557.oss-cn-shenzhen.aliyuncs.com/InitialAvatar', {
            responseType: 'blob'
        })
            .then((response) => {
                const blob = new Blob([response.data], {type: 'image/png'});
                defaultImageInformation = new File([blob], 'ikun.png');
            })
        return defaultImageInformation;
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
        getAddGroupRecording,
        agreeAddRequest,
        refuseAddRequest,
        getFriendsLists,
        createGroup,
        agreeGroupAdd,
        refuseGroupAdd,
        allInsideGroupLists,
        groupUserData,
        getFriendChatUserData,
        getFriendChatMessage,
        changeMessageStatus,
        getGroupUsersLists,
        changeGroupLists,
        getInitialAvatarFile,
    }
})