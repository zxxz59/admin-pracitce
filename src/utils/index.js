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
