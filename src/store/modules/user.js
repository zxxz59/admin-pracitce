import router from '@/router'
const state = {
  token: null,
  userInfo: {}
}
const mutations = {
  updateSetToken(state, payload) {
    state.token = payload
  },
  updateRemoveToken(state) {
    state.token = null
  },
  setUserInfo(state, payload) {
    state.userInfo = payload
  },
  removesUserInfo(state) {
    state.userInfo = {}
  }
}
const actions = {
  async logout(context) {
    context.commit('updateRemoveToken')
    context.commit('removesUserInfo')
    router.push({ name: 'login' })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
