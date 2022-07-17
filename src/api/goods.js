import request from '@/utils/request'

/**
 *
 * @param {*} params
 * @获取商品列表
 */
export function getGoodsAPI(params) {
  return request({
    method: 'GET',
    url: 'goods',
    params
  })
}

/**
 *
 * @param {*} params
 * @删除商品
 */
export function delGoodsAPI(id) {
  return request({
    method: 'delete',
    url: `goods/${id}`
  })
}
