import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入路由
import rightsRouter from './modules/rights'
import goodsRouter from './modules/goods'
import ordersRouter from './modules/orders'
import reportsRouter from './modules/reports'

Vue.use(VueRouter)

const constantRoutes = [
  { path: '/login', name: 'login', component: () => import('@/views/Login') },
  {
    path: '/',
    component: () => import('@/views/Home'),
    redirect: '/welcome',
    children: [
      {
        path: 'welcome',
        component: () => import('@/views/Welcome'),
        name: 'welcome',
        meta: {
          title: '欢迎'
        }
      },
      {
        path: 'users',
        component: () => import('@/views/Users'),
        name: 'users',
        meta: {
          title: '用户',
          icon: 'el-icon-user-solid'
        }
      }
    ]
  },
  { path: '*', component: () => import('@/views/is404') }
]
const asyncRouter = [rightsRouter, goodsRouter, ordersRouter, reportsRouter]
const router = new VueRouter({
  routes: [...constantRoutes, ...asyncRouter]
})

export default router
