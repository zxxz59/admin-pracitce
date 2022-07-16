import request from '@/utils/request'

export function getGoodsAPI(params) {
  return request({
    method: 'GET',
    url: 'goods',
    params
  })
}
