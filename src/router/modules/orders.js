const ordersRouter = {
  path: '/',
  component: () => import('@/views/Home'),
  name: 'orders',
  meta: {
    title: '订单管理',
    icon: 'el-icon-s-claim'
  },
  children: [
    {
      path: 'orders',
      component: () => import('@/views/test'),
      name: 'orders'
    }
  ]
}
export default ordersRouter
