const rightsRouter = {
  path: '/',
  component: () => import('@/views/Home'),
  children: [
    {
      path: 'rights',
      component: () => import('@/views/Rights/right-list.vue'),
      name: 'rights',
      meta: {
        before: '权限管理',
        title: '权限列表',
        icon: 'el-icon-s-check'
      }
    },
    {
      path: 'roles',
      component: () => import('@/views/Rights/role-list.vue'),
      name: 'roles',
      meta: {
        before: '权限管理',
        title: '角色列表',
        icon: 'el-icon-s-check'
      }
    }
  ]
}
export default rightsRouter
