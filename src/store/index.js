import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import user from './modules/user'
import getters from './getters'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: 'vue-admin-practice-token'
})
Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters,
  mutations: {},
  actions: {},
  modules: {
    user
  },
  plugins: [vuexLocal.plugin]
})
