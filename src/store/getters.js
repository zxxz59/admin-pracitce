const getters = {
  token: (state) => state.user.token,
  userId: (state) => state.user.userInfo.id,
  username: (state) => state.user.userInfo.username
}
export default getters
