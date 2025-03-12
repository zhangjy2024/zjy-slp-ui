import Layout from '@/layout'

export default {
  path: '/contact',
  name: 'CONTACT',
  component: Layout,
  meta: { title: '关系' },
  alwaysShow: true,
  redirect: '/contact/index',
  children: [
    {
      path: '/contact/index',
      name: 'ContactIndex',
      component: () => import('@/views/contact/index'),
    },
  ]
}