/**
 *
 * @param {*} list
 * @param {*} pathname
 * @递归路由找icon
 */

export function deepFind(list, pathname) {
  let a = ''
  list.forEach((item) => {
    if (item.name && item.name === pathname && item.meta && item.meta.icon) {
      a = item.meta.icon
    } else if (a === '' && item.children && item.children.length > 0) {
      a = deepFind(item.children, pathname)
    }
  })
  return a
}
/**
 *
 * @param {*} list
 * @param {*} ary
 * @将权限的最后一级防入ary数组中
 */
export function getDefaultList(list, ary) {
  list.forEach((item) => {
    if (!item.children) {
      return ary.push(item.id)
    }
    getDefaultList(item.children, ary)
  })
}
