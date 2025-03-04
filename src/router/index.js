import Vue from "vue"
import Router from "vue-router"
import Layout from '@/layout'
import HOME from '@/router/home'

Vue.use(Router)

/**
 * 不需要验证权限的路由页面
 */
export const constantRoutes = [
  {
    path: '/',
    redirect: '/index',
    hidden: true
  },
  {
    path: '/index',
    redirect: '/home',
    component: Layout,
    hidden: true
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/register'),
    hidden: true
  },
]

/**
 * 需要验证权限的路由页面
 */
export const asyncRoutes = [
  HOME,
  { path: '*', redirect: '/404', hidden: true }
]

const routerBase = () => {
  return '/'
}

const createRouter = () => {
  return new Router({
    base: routerBase(),
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })
}

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
  router.options.routes = newRouter.options.routes
}

export default router