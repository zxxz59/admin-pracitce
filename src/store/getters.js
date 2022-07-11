import store from '.'

const getters = {
  token: (state) => state.user.token,
  userId: (state) => state.user.userInfo.id
}
export default getters
