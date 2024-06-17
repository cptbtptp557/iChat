const express = require("express");
const bodyParser = require('body-parser');
const expressIndex = require("./express/index");
const jwt = require("jsonwebtoken");
const {createServer} = require("http");
const {Server} = require("socket.io");
const mySqlQueryStatements = require("./mySql/mySqlQueryStatements");
const mySqlFunction = require("./mySql/mySqlFunction");

const node_port = 3000;
const socket_io_port = 30000;
const app = express();
const httpServer = createServer(app);

const {sendCaptcha} = expressIndex;
const {sqlFunction} = mySqlFunction;
const {
    getUserListsToiId_sql,
    login_sql,
    search_email,
    change_onlinepresence_sql,
    create_account_sql,
    change_password,
    change_user_lists_sql,
    add_recording,
    add_group_recording,
    get_add_recording,
    get_add_group_recording,
    agree_add_request,
    refuse_add_request,
    change_add_status,
    get_friends_number,
    create_group,
    revise_group_status,
    friend_add_group,
    all_inside_group_lists,
    get_group_data,
    get_group_user_data,
    add_friend_chat_message,
    get_friend_chat_user_data,
    get_friend_chat_message,
    get_reading_status_lists,
} = mySqlQueryStatements;

// 跨域
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
const io = new Server(httpServer, {
    // 跨域
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
    },
    // 连接状态恢复 ---- 发送错过的事件
    connectionStateRecovery: {},
    // 二进制支持
    binary: true,
    // 修改传输大小
    maxHttpBufferSize: 1e8,
});

// 解析请求体数据
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// 发送验证码
app.post("/captcha", (req, res) => {
    const data = req.query;

    try {
        res.status(200).json(sendCaptcha(data.to_email));
    } catch (err) {
        console.error(err);
    }
});

// 获取用户数据
app.get('/getUserLists', (req, res) => {
    const data = req.query;
    let this_account;

    if (data.value) this_account = data.value;
    else this_account = jwt.decode(data.token).thisAccount;

    sqlFunction(getUserListsToiId_sql(data.searchType, data.parameter, this_account))
        .then(result => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({result, this_account});
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
                res.status(200).json(token);
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
            // res.json(null);
            console.error(err);
        });
});

// 退出登录
app.post('/signOut', (req, res) => {
    const data = req.query;
    const this_account = jwt.decode(data.token).thisAccount;

    sqlFunction(change_onlinepresence_sql("false", this_account))
        .then(() => {
            res.status(200).json("退出成功!!!");
        })
        .catch(console.error);
});

// 注册
app.post('/createAccount', (req, res) => {
    const data = req.query;
    const warn = "此邮箱已绑定!!!";

    sqlFunction(search_email(data.mailbox))
        .then(result => {
            if (result.length !== 0) {
                res.json(warn);
            } else {
                sqlFunction(create_account_sql(data.nickname, data.mailbox, data.password))
                    .then(result => {
                        const iID = result.insertId;
                        res.status(200).json({data, iID});
                    }).catch(console.error)
            }
        }).catch(console.error);
});

// 修改密码
app.post('/changePassword', (req, res) => {
    const data = req.query;

    sqlFunction(change_password(data.email, data.new_password))
        .then(() => {
            res.status(200).json("密码修改成功!!!")
        }).catch(console.error);
});

// 修改用户信息
app.post('/changeUserLists', (req, res) => {
    const data = req.query;

    sqlFunction(change_user_lists_sql(data.nickname, data.signature, data.gender, data.birthday, data.account))
        .then(() => {
            res.status(200).json("数据修改成功!!!")
        }).catch(console.error);
});

// 获取添加、加入、邀请好友记录
app.get('/getAddRecording', (req, res) => {
    const data = req.query;

    sqlFunction(get_add_recording(data.to_iId))
        .then(result => {
            res.status(200).json({result});
        }).catch(console.error);
});

// 获取加入、邀请好友进入群聊记录
app.get('/getAddGroupRecording', (req, res) => {
    const data = req.query;

    sqlFunction(get_add_group_recording(data.group_leader_iid))
        .then(result => {
            res.status(200).json({result});
        }).catch(console.error);
})

// 同意添加好友申请
app.get('/agreeAddRequest', (req, res) => {
    const data = req.query;

    sqlFunction(agree_add_request(data.from_iId, data.to_iId, data.from_name, data.to_notes))
        .then(() => {
            sqlFunction(change_add_status(data.from_iId, data.to_iId))
                .catch(console.error);
            res.status(200).json("同意添加申请成功!!!");
        }).catch(console.error);
})

// 拒绝添加好友申请
app.get('/refuseAddRequest', (req, res) => {
    const data = req.query;

    sqlFunction(refuse_add_request(data.from_iId, data.to_iId))
        .then(() => {
            res.status(200).json("拒绝添加申请成功!!!");
        }).catch(console.error);
})

// 获取好友列表信息
app.get('/getFriendsLists', (req, res) => {
    const data = req.query;

    sqlFunction(get_friends_number(data.iId))
        .then(result => {
            res.status(200).json({result});
        }).catch(console.error);
})

// 创建群聊
app.post('/createGroup', (req, res) => {
    const data = req.body;

    sqlFunction(create_group(data.group_name, data.group_leader_iid, data.group_announcement))
        .then(result => {
            for (let i = 0; i < data.add_user_iid.length; i++) {
                sqlFunction(friend_add_group(result.insertId, data.add_user_iid[i]))
                    .catch(console.error);
            }
        })
        .then(() => {
            res.status(200).json(1);
        }).catch(console.error);
})

// 同意群聊申请
app.post('/agreeGroupAdd', (req, res) => {
    const data = req.query;

    sqlFunction(friend_add_group(data.gid, data.iid))
        .then(() => {
            sqlFunction(revise_group_status(1, data.gid, data.iid))
                .then(() => {
                    res.status(200).json(1);
                }).catch(console.error);
        }).catch(console.error);
})

// 拒绝群聊申请
app.post('/refuseGroupAdd', (req, res) => {
    const data = req.query;

    sqlFunction(revise_group_status(2, data.gid, data.iid))
        .then(() => {
            res.status(200).json(1);
        }).catch(console.error);
})

// 获取所有所在群聊名单
app.get('/allInsideGroupLists', (req, res) => {
    const data = req.query;
    let group_promise = [];

    sqlFunction(all_inside_group_lists(data.iid))
        .then(lists => {
            for (let i = 0; i < lists.length; i++) {
                group_promise.push(sqlFunction(get_group_data(lists[i].gid)))
            }
            return Promise.all(group_promise);
        })
        .then((group_data) => {
            res.status(200).json({group_data});
        }).catch(console.error);
})

// 获取群聊成员信息
app.get('/groupUserData', (req, res) => {
    const data = req.query;
    const userLists = [];

    sqlFunction(get_group_user_data(data.gid))
        .then((group_user_data) => {
            group_user_data.forEach(userData => {
                userLists.push(sqlFunction(getUserListsToiId_sql("totalusers", "iId", userData.iid)));
            });

            Promise.all(userLists)
                .then((thisUserLists) => {
                    const flattenedUserLists = thisUserLists.map(lists => lists[0]);
                    res.status(200).json({group_user_data, flattenedUserLists});
                })

        }).catch(console.error);
})

// 获取好友聊天列表数据
app.get('/getFriendChatUserData', (req, res) => {
    const data = req.query;
    const userLists = [];

    sqlFunction(get_friend_chat_user_data(data.account_iid))
        .then((friendChatUserData) => {
            for (let i = 0; i < friendChatUserData.length; i++) {
                for (let j = 0; j < friendChatUserData.length; j++) {
                    if (friendChatUserData[i].to_iid === friendChatUserData[j].from_iid
                        && friendChatUserData[i].from_iid === friendChatUserData[j].to_iid)
                        friendChatUserData.splice(i > j ? i : j, 1);
                }
            }

            sqlFunction(get_reading_status_lists(data.account_iid))
                .then((unreadNum) => {
                    for (let i = 0; i < friendChatUserData.length; i++) {
                        if (friendChatUserData[i].from_iid === (data.account_iid >>> 0))
                            userLists.push(sqlFunction(getUserListsToiId_sql("totalusers", "iId", friendChatUserData[i].to_iid)));
                        else userLists.push(sqlFunction(getUserListsToiId_sql("totalusers", "iId", friendChatUserData[i].from_iid)));
                    }

                    Promise.all(userLists)
                        .then((thisUserLists) => {
                            const flattenedUserLists = thisUserLists.map(lists => lists[0]);

                            res.status(200).json({friendChatUserData, flattenedUserLists, unreadNum});
                        })
                }).catch(console.error);
        }).catch(console.error);
})

// 获取好友聊天记录
app.get('/getFriendChatMessage', (req, res) => {
    const data = req.query;
    console.log(data)

    sqlFunction(get_friend_chat_message(data.from_iid, data.to_iid, data.chatMessageNum))
        .then((allMessage) => {
            res.status(200).json(allMessage);
        }).catch(console.error);
})

/*==================================   Socket.io   ==================================*/
let socket_users = {};

io.on('connection', socket => {
    socket.on("login", async (userId) => {
        socket.name = userId;
        socket_users[userId] = socket;
        socket.emit("login", socket.id);
        socket_users[userId].broadcast.emit("user_login", userId);
        socket_users[userId].emit("friendChatUserData", userId);
    });

    socket.on("sign_out", async (userId) => {
        socket_users[userId].broadcast.emit("sign_out", userId);
    });

    socket.on("add", async (toUserLists) => {
        if (toUserLists.to_iid) {
            if (socket_users[toUserLists.to_iid]) socket_users[toUserLists.to_iid].emit('add_lists', toUserLists);

            sqlFunction(add_recording(toUserLists.from_iid, toUserLists.to_iid, toUserLists.from_name, toUserLists.to_notes, toUserLists.add_status, toUserLists.add_time))
                .then(() => {
                    socket_users[toUserLists.from_iid].emit('add_lists', 'true');
                }).catch(() => {
                socket_users[toUserLists.from_iid].emit('add_lists', 'false');
            });
        } else if (toUserLists.group_leader_iid) {
            if (socket_users[toUserLists.group_leader_iid]) socket_users[toUserLists.group_leader_iid].emit('add_lists', toUserLists);

            sqlFunction(add_group_recording(toUserLists.from_iid, toUserLists.to_gid, toUserLists.group_name, toUserLists.add_status, toUserLists.add_time, toUserLists.group_leader_iid, toUserLists.from_name))
                .then(() => {
                    console.log("成功")
                }).catch((err) => {
                console.log(err);
            })
        }
    });

    socket.on("sendFriendMessage", (message) => {
        sqlFunction(add_friend_chat_message(message.from_iid, message.to_iid, message.message, message.reading_status, message.send_time))
            .then(() => {
                socket_users[message.to_iid].emit("sendFriendMessage", message);
            }).catch(console.error);
    })

    socket.on("chatUsersIds", (chatUsersIds) => {
        socket_users[chatUsersIds.thisUserId].emit("chatUsersIds", chatUsersIds)
    })

    console.log("有人进入了聊天室!!! 当前已连接客户端数量: " + io.engine.clientsCount);
    socket.on("disconnect", () => {
        console.log("有人离开了聊天室!!! 当前已连接客户端数量: " + io.engine.clientsCount);
    });
});

app.listen(node_port, () => {
    console.log(`node服务器在端口: ${node_port}!!!`);
});

httpServer.listen(socket_io_port, () => {
    console.log(`socket.io服务器在端口: ${httpServer.address().port}!!!`);
});