import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import JsonViewer from "vue3-json-viewer"

const app = createApp(App);

app.use(router)
    .use(store)
    .use(ElementPlus)
    .use(JsonViewer)
    .mount('#app')
