const ordersRouter = {
  path: '/',
  component: () => import('@/views/Home'),
  children: [
    {
      path: 'orders',
      component: () => import('@/views/test'),
      name: 'orders',
      meta: {
        title: '订单管理',
        icon: 'el-icon-s-claim'
      }
    }
  ]
}
export default ordersRouter
