import {createApp} from 'vue';
import './style.less';
import App from './App.vue';
import {vueRouter} from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import {createPinia} from "pinia";
import axios from "axios";

const app = createApp(App)
    .use(vueRouter().router)
    .use(ElementPlus)
    .use(createPinia());

app.mount('#app');


/*------------------------------------------------ 请求拦截器 ------------------------------------------------*/
const lastRequestTime = new Set();

// 黑名单url
const notAllowRepeatRequestIUrl = new Map();
notAllowRepeatRequestIUrl.set('/changePassword', 60000);

axios.interceptors.request.use(
    config => {
        let request_url = config.url as string;
        request_url = request_url.substring(request_url.lastIndexOf('/'));
        let timeOutSeconds = notAllowRepeatRequestIUrl.has(request_url) ? notAllowRepeatRequestIUrl.get(request_url) : 0;

        if (notAllowRepeatRequestIUrl.has(request_url) && lastRequestTime.has(request_url))
            return Promise.reject(new Error(`请求太多，请${timeOutSeconds}秒后重试.`));

        lastRequestTime.add(request_url);
        setTimeout(() => {
            lastRequestTime.delete(request_url);
        }, timeOutSeconds);
        return config;
    },
    error => {
        // 处理请求错误
        return Promise.reject(error);
    }
);
