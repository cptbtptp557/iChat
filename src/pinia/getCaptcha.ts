import axios from "axios";
import {ref} from "vue";

export const getCaptcha = () => {
    const captcha = ref([]);
    const lastRequestTime = ref(0);

    const isWithinSixtySeconds = () => {
        const now = Date.now();
        return now - lastRequestTime.value < 60000;
    };

    const uploadEmail = async (to_email: string) => {
        return await axios.post('http://localhost:3000/captcha', '', {
            params: {
                'to_email': to_email,
            }
        })
    }

    axios.interceptors.request.use(
        config => {
            if (config.url === 'http://localhost:3000/captcha' && isWithinSixtySeconds()) {
                console.error('请求太频繁，请在60秒后重试。');
                return Promise.reject(new Error('请求太多，请 60 秒后重试.'));
            }
            // 更新上次请求时间
            lastRequestTime.value = Date.now();
            return config;
        },
        error => {
            // 处理请求错误
            return Promise.reject(error);
        }
    );

    return {
        captcha,
        uploadEmail,
    }
}