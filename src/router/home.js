import Layout from '@/layout'

export default {
  path: '/home',
  name: 'HOME',
  component: Layout,
  meta: { title: '首页' },
  alwaysShow: true,
  redirect: '/home/index',
  children: [
    {
      path: '/home/index',
      name: 'HomeIndex',
      component: () => import('@/views/home/index'),
    },
    {
      path: '/home/todo',
      name: 'ToDo',
      component: () => import('@/views/home/todo'),
    },
    {
      path: '/home/todo/detail',
      name: 'ToDoDetail',
      component: () => import('@/views/home/todo/detail'),
      props(route){
        return {
          id: route.query.id
        }
      }
    },
  ]
}