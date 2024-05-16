import {createRouter, createWebHistory} from 'vue-router';
import home from "../page/home/home.vue";
import login from "../page/login/login.vue";
import voiceCallWindow from "../page/voiceCallWindow/voiceCallWindow.vue";
import videoCallWindow from "../page/videoCallWindow/videoCallWindow.vue";
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
        {
            path: '/videoCallWindow',
            component: videoCallWindow,
        },
    ];

    const router = createRouter({
        history: createWebHistory(),
        routes,
    });

    router.beforeEach((to, from, next) => {
        let token = localStorage.getItem('token');
        console.log(from);
        
        if (to.path !== '/login' && to.path !== '/forgotPassword') {
            if (token) {
                next();
            } else {
                next('/login');
            }
        } else {
            next();
        }
    });

    return {
        router,
    };
};
