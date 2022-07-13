import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: () => import('@/views/Login') },
  {
    path: '/home',
    component: () => import('@/views/Home'),
    children: [
      { path: '', component: () => import('@/views/Welcome') },
      { path: 'user', component: () => import('@/views/User') }
    ]
  },
  { path: '*', component: () => import('@/views/is404') }
]

const router = new VueRouter({
  routes
})

export default router
