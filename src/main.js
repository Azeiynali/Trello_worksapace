// Vue
import { createApp } from "vue";

// Components
import App from "./App.vue";

// Form Kit
import { plugin } from "@formkit/vue";
import defaultConfig from "../formkit.config";
import "../node_modules/@formkit/themes/dist/css/genesis/index.css";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
    components,
    directives,
});

// App
let app = createApp(App);
app.use(plugin, defaultConfig); // form kit
app.use(vuetify); // vuetify
app.mount("#app");
