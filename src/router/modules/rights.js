const rightsRouter = {
  path: '/',
  component: () => import('@/views/Home'),
  children: [
    {
      path: 'rights',
      component: () => import('@/views/test'),
      name: 'rights',
      meta: {
        title: '权限管理',
        icon: 'el-icon-s-check'
      }
    },
    {
      path: 'roles',
      component: () => import('@/views/test'),
      name: 'roles'
    }
  ]
}
export default rightsRouter
