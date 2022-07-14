import request from '@/utils/request'
export function getMenusListAPI() {
  return request({
    method: 'get',
    url: 'menus'
  })
}
