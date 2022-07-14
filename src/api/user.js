import request from '@/utils/request'

/**
 *
 * @param {*} data
 * @登录
 */
export const loginAPI = (data) =>
  request({
    method: 'POST',
    url: 'login',
    data
  })

/**
 *
 * @param {*} params
 * @获得用户列表
 */
export function getUsersListAPI(params) {
  return request({
    method: 'GET',
    url: 'users',
    params
  })
}
/**
 *
 * @param {*} id
 * @param {*} type
 * @修改用户状态
 */
export function editUsersStateAPI(id, type) {
  return request({
    method: 'put',
    url: `users/${id}/state/${type}`
  })
}

/**
 *
 * @param {*} id
 * @删除单个用户
 */
export function delUserAPI(id) {
  return request({
    method: 'delete',
    url: `users/${id}`
  })
}
