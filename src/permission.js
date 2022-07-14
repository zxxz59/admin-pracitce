import router from '@/router'
import store from '@/store'
const whiteList = ['/login', '/404']

// 路由守卫
router.beforeEach((to, from, next) => {
  if (store.getters.token) {
    next()
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
