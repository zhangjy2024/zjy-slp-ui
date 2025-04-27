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
    {
      path: '/groups/member',
      name: 'GroupsMember',
      component: () => import('@/views/groups/member'),
    },
    {
      path: '/groups/notify',
      name: 'GroupsNotify',
      component: () => import('@/views/groups/notify'),
    },
    {
      path: '/groups/resource',
      name: 'GroupsResource',
      component: () => import('@/views/groups/resource'),
    },
    {
      path: '/groups/task',
      name: 'GroupsTask',
      component: () => import('@/views/groups/task'),
    },
  ]
}