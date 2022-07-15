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
/**
 *
 * @param {*} data
 * @添加新用户
 */
export function addUserAPI(data) {
  return request({
    method: 'post',
    url: 'users',
    data
  })
}
/**
 *
 * @param {*} id
 * @根据ID查询用户信息
 */
export function getUserAPI(id) {
  return request({
    method: 'get',
    url: `users/${id}`
  })
}

/**
 *
 * @param {*} id
 * @根据ID查询用户信息
 */
export function editUserAPI(data) {
  return request({
    method: 'put',
    url: `users/${data.id}`,
    data
  })
}
