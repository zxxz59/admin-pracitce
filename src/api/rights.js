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

export function roleListAPI() {
  return request({
    url: 'roles'
  })
}
