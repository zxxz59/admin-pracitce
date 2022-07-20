import request from '@/utils/request'
export function getOrdersListAPI(params) {
  return request({
    method: 'orders',
    url: 'menus',
    params
  })
}
