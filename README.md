# iChat(桌面端)

## 项目介绍

基于electron的聊天软件<br/>
前端使用Vue3+Socket.io+Electron+Vite+Element-Plus+WebRTC<br/>
后端使用Express+Socket.io

## 实现功能

1. 用户的登陆、注册、退出登录<br/>
2. 群聊、私聊功能(拥有未读消息提示功能)
    - 视频、语音通话
    - 上传文字、图片、视频、文件
3. 对上传进行了切片处理
4. 添加好友、创建及加入群聊、对群成员的管理
5. 搜索好友、群聊
6. 编辑个人资料、群聊资料

## 启动项目

### 一、安装node

```bash
# 检查node版本 开发版本 v18.16.0
node -v
```

### 二、安装依赖

```bash
# 安装依赖
npm install
```

### 三、运行项目

```bash
# 运行项目
npm run dev
```

### 四、打包