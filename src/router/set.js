import Layout from '@/layout'

export default {
  path: '/set',
  name: 'SET',
  component: Layout,
  meta: { title: '关系' },
  alwaysShow: true,
  redirect: '/set/index',
  children: [
    {
      path: '/set/index',
      name: 'SetIndex',
      component: () => import('@/views/set/index'),
    },
  ]
}