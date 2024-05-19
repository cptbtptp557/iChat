import {io} from "socket.io-client";

const socket = io('ws://127.0.0.1:30000', {
    transports: ['websocket', 'polling'], // 指定传输方式
    autoConnect: true, // 是否自动连接
    reconnection: true, // 是否自动重新连接
    reconnectionAttempts: 100, // 重新连接尝试次数
    reconnectionDelay: 1000, // 重新连接延迟时间（毫秒）
    withCredentials: true, // 是否在跨域请求中发送跨站凭据
    reconnectionDelayMax: 10000, // 当连接丢失并尝试重新连接时，重连延迟的最大值
});

export default socket;