import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./index.css";
import { marked } from "marked";

const markedMixin = {
  methods: {
    md: (markdown) => {
      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        headerIds: false,
        tables: true,
        breaks: true,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false,
      });
      let changedText = marked(markdown);
      changedText = changedText.replaceAll("&lt;", "<");
      changedText = changedText.replaceAll("&gt;", ">");
      changedText = changedText.replaceAll("&quot;", '"');
      return changedText;
    },
  },
};

const app = createApp(App);
app.config.unwrapInjectedRef = true;
app.use(router);
app.use(store);
app.mixin(markedMixin).mount("#app");
