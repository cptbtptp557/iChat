import {createRouter, createWebHistory} from 'vue-router';
import home from "../page/home/home.vue";
import login from "../page/login/login.vue";
import voiceCallWindow from "../page/voiceCallWindow/voiceCallWindow.vue";
import forgotPassword from "../page/forgotPassword/forgotPassword.vue";

export const vueRouter = () => {
    const routes = [
        {
            path: '/',
            component: home,
        },
        {
            path: '/login',
            component: login,
        },
        {
            path: '/forgotPassword',
            component: forgotPassword,
        },
        {
            path: '/voiceCallWindow',
            component: voiceCallWindow,
        },
    ];

    const router = createRouter({
        history: createWebHistory(),
        routes,
    });

    return {
        router,
    };
};
