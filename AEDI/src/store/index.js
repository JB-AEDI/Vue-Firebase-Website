import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

import user from "./modules/user";

const store = createStore({
  modules: {
    user,
  },
  state() {
    return {};
  },
  getters: {},
  mutations: {},
  actions: {},
  plugins: [createPersistedState()],
});

export default store;
