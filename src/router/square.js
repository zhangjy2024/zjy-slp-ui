import Layout from '@/layout'

export default {
  path: '/square',
  name: 'SQUARE',
  component: Layout,
  meta: { title: '关系' },
  alwaysShow: true,
  redirect: '/square/index',
  children: [
    {
      path: '/square/index',
      name: 'SquareIndex',
      component: () => import('@/views/square/index'),
    },
    {
      path: '/square/addPosts',
      name: 'AddPosts',
      component: () => import('@/views/square/addPosts')
    }
  ]
}