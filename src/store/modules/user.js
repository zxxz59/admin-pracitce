import router from '@/router'
import { setToken, getToken, removeToken } from '@/utils/auth'
import { loginAPI } from '@/api/user'
const state = {
  token: getToken(),
  userInfo: {}
}
const mutations = {
  updateSetToken(state, payload) {
    setToken(payload)
    state.token = payload
  },
  updateRemoveToken(state) {
    state.token = null
    removeToken()
  },
  setUserInfo(state, payload) {
    state.userInfo = payload
  },
  removesUserInfo(state) {
    state.userInfo = {}
  }
}
const actions = {
  async login(context, data) {
    try {
      const info = await loginAPI(data)
      context.commit('updateSetToken', info.token)
      context.commit('setUserInfo', info)
    } catch (error) {
      console.log(error)
    }
  },
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
