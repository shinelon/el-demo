import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import api from "./api/index";

const app = createApp(App);
// // 挂载api
app.config.globalProperties.$api = api;

app.use(router)
    .use(store)
    .use(ElementPlus)
    .mount('#app')
