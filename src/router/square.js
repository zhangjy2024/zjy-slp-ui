import Layout from '@/layout'

export default {
  path: '/square',
  name: 'SQUARE',
  component: Layout,
  meta: { title: '关系' },
  alwaysShow: true,
  redirect: '/square',
  children: [
    {
      path: '/square',
      name: 'SquareIndex',
      component: () => import('@/views/square/index'),
      children: [
        {
          path: '/square/index',
          name: 'Profile',
          component: () => import('@/views/square/square')
        },
        {
          path: '/square/profile',
          name: 'Profile',
          component: () => import('@/views/profile/index')
        },
        {
          path: '/square/history',
          name: 'History',
          component: () => import('@/views/square/history')
        },
        {
          path: '/square/favorites',
          name: 'Favorites',
          component: () => import('@/views/square/favorites')
        },
      ]
    },
    {
      path: '/square/posts',
      name: 'Posts',
      component: () => import('@/views/square/posts')
    },
    {
      path: '/square/addPosts',
      name: 'AddPosts',
      component: () => import('@/views/square/posts/AddPosts.vue')
    },
    {
      path: '/square/circle/index',
      name: 'CircleIndex',
      component: () => import('@/views/square/circle/index.vue')
    },
    {
      path: '/square/circle/detail',
      name: 'CircleDetail',
      component: () => import('@/views/square/circle/CircleDetail.vue'),
      props(route){
        return {
          id: route.query.id
        }
      }
    },
    {
      path: '/square/topic/index',
      name: 'TopicIndex',
      component: () => import('@/views/square/topic/index.vue')
    },
    {
      path: '/square/topic/detail',
      name: 'TopicDetail',
      component: () => import('@/views/square/topic/TopicDetail.vue'),
      props(route){
        return {
          id: route.query.id
        }
      }
    },
  ]
}