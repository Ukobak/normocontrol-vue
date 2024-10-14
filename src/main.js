import { createApp } from "vue";
import Router from "./general/Router";
import App from "./App.vue";

const app = createApp(App);

app.use(Router);
app.mount("#app");
