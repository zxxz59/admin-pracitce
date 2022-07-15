const rightsRouter = {
  path: '/',
  component: () => import('@/views/Home'),
  children: [
    {
      path: 'rights',
      component: () => import('@/views/Rights/right-list.vue'),
      name: 'rights',
      meta: {
        title: '权限管理',
        icon: 'el-icon-s-check'
      }
    },
    {
      path: 'roles',
      component: () => import('@/views/Rights/role-list.vue'),
      name: 'roles'
    }
  ]
}
export default rightsRouter
