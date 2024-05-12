import {createApp} from 'vue';
import './style.less';
import App from './App.vue';
import {vueRouter} from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import {createPinia} from "pinia";

const app = createApp(App)
    .use(vueRouter().router)
    .use(ElementPlus)
    .use(createPinia());

app.mount('#app');
