const goodsRouter = {
  path: '/',
  component: () => import('@/views/Home'),
  children: [
    {
      path: 'goods',
      component: () => import('@/views/Goods/goods-index.vue'),
      name: 'goods',
      meta: {
        before: '商品管理',
        title: '商品列表',
        icon: 'el-icon-s-goods'
      }
    },
    {
      path: 'goods/add',
      component: () => import('@/views/Goods/components/add-goods.vue'),
      name: 'addgoods',
      meta: {
        before: '商品管理',
        title: '商品添加'
      }
    },
    {
      path: 'params',
      component: () => import('@/views/Goods/params-index.vue'),
      name: 'params',
      meta: {
        before: '商品管理',
        title: '分类参数'
      }
    },
    {
      path: 'categories',
      component: () => import('@/views/Goods/categories-index.vue'),
      name: 'categories',
      meta: {
        before: '商品管理',
        title: '商品分类'
      }
    }
  ]
}
export default goodsRouter
