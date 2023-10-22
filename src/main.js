import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import store from "./store";
import { InstallCodemirro } from "codemirror-editor-vue3";

createApp(App).use(store).use(router, axios, InstallCodemirro).mount("#app");
