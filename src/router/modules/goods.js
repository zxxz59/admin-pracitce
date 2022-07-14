const goodsRouter = {
  path: '/',
  component: () => import('@/views/Home'),
  children: [
    {
      path: '/goods',
      component: () => import('@/views/test'),
      name: 'goods',
      meta: {
        title: '商品管理',
        icon: 'el-icon-s-goods'
      }
    },
    {
      path: 'params',
      component: () => import('@/views/test'),
      name: 'params'
    },
    {
      path: 'categories',
      component: () => import('@/views/test'),
      name: 'categories'
    }
  ]
}
export default goodsRouter
