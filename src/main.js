import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./assets/css/app.scss"
import vSelect from 'vue-select'
import "vue-select/dist/vue-select.css";
import VueCookies from 'vue3-cookies'

const app = createApp(App)
app.config.devtools = true
app.use(store)
app.use(router)
app.use(VueCookies)
app.component('v-select', vSelect)
app.mount("#app");
