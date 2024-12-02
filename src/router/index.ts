import {createRouter, createWebHistory} from 'vue-router';

export const vueRouter = () => {
    const routes = [
        {
            path: '/',
            component: () => import("../page/home/home.vue"),
        },
        {
            path: '/login',
            component: () => import("../page/login/login.vue"),
        },
        {
            path: '/forgotPassword',
            component: () => import("../page/forgotPassword/forgotPassword.vue"),
        },
        {
            path: '/voiceCallWindow',
            component: () => import("../page/voiceCallWindow/voiceCallWindow.vue"),
        },
        {
            path: '/videoCallWindow',
            component: () => import("../page/videoCallWindow/videoCallWindow.vue"),
        },
        {
            path: '/watchVideoWindow',
            component: () => import("../page/watchVideoWindow/watchVideoWindow.vue"),
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
