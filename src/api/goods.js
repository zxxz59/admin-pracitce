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
/**
 *
 * @获取分类
 */
export function getCategoriesAPI() {
  return request({
    method: 'get',
    url: 'categories'
  })
}

/**
 *
 * @param {*} id
 * @获取动态参数列表
 */
export function getAttributesAPI(id) {
  return request({
    method: 'get',
    url: `categories/${id}/attributes`,
    params: {
      sel: 'many'
    }
  })
}
/**
 *
 * @param {*} id
 * @获取静态参数列表
 */
export function getAttributesOnlyAPI(id) {
  return request({
    method: 'get',
    url: `categories/${id}/attributes`,
    params: {
      sel: 'only'
    }
  })
}
/**
 *
 * @param {*} data
 * @returns添加商品
 */
export function addGoodsAPI(data) {
  return request({
    method: 'post',
    url: 'goods',
    data
  })
}

/**
 *
 * @param {*} data
 * @编辑添加某商品详情
 */
export function getGoodsDetailAPI(id) {
  return request({
    method: 'get',
    url: `goods/${id}`
  })
}
/**
 *
 * @param {*} data
 * @编辑某商品详情
 */
export function editGoodsAPI(id, data) {
  return request({
    method: 'put',
    url: `goods/${id}`,
    data
  })
}

/**
 *
 * @param {*} data
 * @returns删除参数
 */
export function delAttributeAPI(id, attrid) {
  return request({
    method: 'delete',
    url: `categories/${id}/attributes/${attrid}`
  })
}

/**
 *
 * @param {*} data
 * @returns添加动态参数静态属性
 */
export function addAttributeAPI(id, data) {
  return request({
    method: 'post',
    url: `categories/${id}/attributes`,
    data
  })
}
/**
 *
 * @param {*} data
 * @根据 ID 查询参数
 */
export function getAttributeOneAPI(id, attrid, params) {
  return request({
    method: 'get',
    url: `categories/${id}/attributes/${attrid}`,
    params
  })
}

/**
 *
 * @param {*} data
 * @根据 编辑
 */
export function editAttributeOneAPI(id, attrid, data) {
  return request({
    method: 'put',
    url: `categories/${id}/attributes/${attrid}`,
    data
  })
}
