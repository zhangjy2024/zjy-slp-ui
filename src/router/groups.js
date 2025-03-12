import Layout from '@/layout'

export default {
  path: '/groups',
  name: 'GROUPS',
  component: Layout,
  meta: { title: '组织' },
  alwaysShow: true,
  redirect: '/groups/index',
  children: [
    {
      path: '/groups/index',
      name: 'GroupsIndex',
      component: () => import('@/views/groups/index'),
    },
  ]
}