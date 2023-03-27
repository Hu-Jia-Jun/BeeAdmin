import { createApp } from "vue";
// reset style sheet
import "@/style/reset.scss";
import "@/style/tailwind.css";
import "element-plus/dist/index.css";
import App from "./App.vue";
import { router } from "./router";
import ElementPlus from "element-plus";

const app = createApp(App);
app.use(router).use(ElementPlus).mount("#app");
