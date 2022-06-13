import { SET_USER_NAME, SET_USER_ADMIN } from "../mutation-types";

const state = () => ({
  userName: "",
  userAdmin: false,
});

const mutations = {
  [SET_USER_NAME](state, payload) {
    state.userName = payload;
  },
  [SET_USER_ADMIN](state, payload) {
    state.userAdmin = payload;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};
