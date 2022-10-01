import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { marked } from "marked";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";

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
  faX,
  faCheck,
  faPlus,
  faSpinner,
  faCamera,
  faUserPen,
  faFloppyDisk,
  faChevronLeft,
  faPaperPlane,
  faUserSlash,
  faMinus,
  faArrowLeftRotate,
  faEnvelope,
  faClock,
  faArrowDown,
  faArrowUp,
  faEye,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";

import { faLightbulb } from "@fortawesome/free-regular-svg-icons";

import "./index.css";
import { faHotjar } from "@fortawesome/free-brands-svg-icons";

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
  faClipboardCheck,
  faX,
  faCheck,
  faPlus,
  faSpinner,
  faCamera,
  faUserPen,
  faFloppyDisk,
  faChevronLeft,
  faPaperPlane,
  faUserSlash,
  faMinus,
  faArrowLeftRotate,
  faEnvelope,
  faHotjar,
  faClock,
  faArrowUp,
  faArrowDown,
  faEye,
  faShareNodes
);

const markedMixin = {
  methods: {
    md: function (input) {
      return marked(input);
    },
  },
};

const app = createApp(App);
app.config.unwrapInjectedRef = true;
app.use(router);
app.use(store);
app.mixin(markedMixin);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(autoAnimatePlugin).mount("#app");
