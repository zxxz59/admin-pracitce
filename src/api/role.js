import request from '@/utils/request'

/**
 *
 * @param {*} id
 * @根据ID查询角色
 */
// export function getRoleAPI(id) {
//   return request({
//     method: 'get',
//     url: `roles/${id}`
//   })
// }

/**
 *
 * @param {*} id
 * @分配用户角色
 */
export function assignRoleAPI(data) {
  return request({
    method: 'put',
    url: `users/${data.id}/role`,
    data
  })
}

/**
 *
 * @param {*} id
 * @分配用户角色
 */
export function getRoleListAPI() {
  return request({
    method: 'get',
    url: 'roles'
  })
}
