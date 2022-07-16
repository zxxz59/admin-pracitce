import request from '@/utils/request'

/**
 *
 * @权限列表
 */
export function rightsListAPI() {
  return request({
    url: 'rights/list'
  })
}
/**
 *
 * @角色列表
 */
export function roleListAPI() {
  return request({
    url: 'roles'
  })
}
/**
 *
 * @param {*} data(roleName roleDesc)
 * @添加角色
 */
export function addRolesAPI(data) {
  return request({
    url: 'roles',
    method: 'POST',
    data
  })
}

/**
 *
 * @param {*} id
 * @删除角色
 */
export function delRloesAPI(id) {
  return request({
    url: `roles/${id}`,
    method: 'delete'
  })
}

/**
 *
 * @param {*} params
 * @查询个人信息
 */
export function personalRolesAPI(id) {
  return request({
    url: `roles/${id}`,
    method: 'get'
  })
}

/**
 *
 * @param {*} data
 * @编辑角色
 */
export function editRolesAPI(data) {
  return request({
    url: `roles/${data.roleId}`,
    method: 'put',
    data
  })
}
