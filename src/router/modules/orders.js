const ordersRouter = {
  path: '/',
  component: () => import('@/views/Home'),
  children: [
    {
      path: 'orders',
      component: () => import('@/views/Order'),
      name: 'orders',
      meta: {
        before: '订单管理',
        title: '订单列表',
        icon: 'el-icon-s-claim'
      }
    }
  ]
}
export default ordersRouter
