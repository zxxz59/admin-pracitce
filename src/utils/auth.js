import Cookies from 'js-cookie'

const tokenKey = 'admin-pracitce-token'

export function setToken(params) {
  return Cookies.set(tokenKey, params)
}
export function getToken() {
  return Cookies.get(tokenKey)
}
export function removeToken() {
  return Cookies.remove(tokenKey)
}
