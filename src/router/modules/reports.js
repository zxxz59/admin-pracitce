const reportsRouter = {
  path: '/',
  component: () => import('@/views/Home'),
  children: [
    {
      path: 'reports',
      component: () => import('@/views/test'),
      name: 'reports',
      meta: {
        title: '数据统计',
        icon: 'el-icon-s-data'
      }
    }
  ]
}
export default reportsRouter
