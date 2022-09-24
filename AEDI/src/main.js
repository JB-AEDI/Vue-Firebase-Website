import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faClockRotateLeft,
  faCloudArrowUp,
  faBullhorn,
  faGraduationCap,
  faBook,
  faMagnifyingGlass,
  faUpload,
  faHeart,
  faTrash,
  faChevronRight,
  faClipboardCheck,
} from "@fortawesome/free-solid-svg-icons";

import { faLightbulb } from "@fortawesome/free-regular-svg-icons";

import "./index.css";

/* add icons to the library */
library.add(
  faClockRotateLeft,
  faCloudArrowUp,
  faBullhorn,
  faGraduationCap,
  faBook,
  faLightbulb,
  faMagnifyingGlass,
  faUpload,
  faHeart,
  faTrash,
  faChevronRight,
  faClipboardCheck
);

const app = createApp(App);
app.config.unwrapInjectedRef = true;
app.use(router);
app.use(store);
app.component("font-awesome-icon", FontAwesomeIcon).mount("#app");
