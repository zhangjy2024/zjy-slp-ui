import VueRouter from 'vue-router';
import router from './router';
import Store from '@/store';
import getPageTitle from './utils/get-page-title';

const flattenRoutes = (routes) => {
  const result = []
  routeFlatten(routes, result)
  return result
}

const routeFlatten = (arr, result = []) => {
  for (let item of arr) {
    if (item.children && item.children.length > 0) {
      routeFlatten(item.children, result)
    } else {
      result.push(item)
    }
  }
  return result
}

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

// 记录路由是否添加
let registerRouteFresh = true;

router.beforeEach(async (to, from, next) => {
  
  document.title = getPageTitle()

  if (to.path === '/login' || to.meta.isPermit){
    registerRouteFresh = true;
    next();
  } else {
    const token = sessionStorage.getItem('access_token');
    if (token) {
      if (registerRouteFresh) {
        try {
          const accessRoutes = await Store.dispatch('permission/generateRoutes', sessionStorage.getItem('user_info'))
          router.options.routes = router.options.routes.concat(accessRoutes)
          router.addRoutes(accessRoutes)

          await Store.dispatch('login/initCurrentUser')
          registerRouteFresh = false
          next({ ...to, replace: true })
        } catch (error) {
          console.log('error', error)
        }
      } else {
        const titleAccessRoutes = flattenRoutes(router.options.routes)
        const matchRoute = titleAccessRoutes.find(n => (n && n.name === to.name))
        if (matchRoute) {
          next()
        } else {
          next({ path: '/404', replace: true })
        }
      }
    } else {
      const pathname = window.location.pathname
      let query = { redirect_uri: window.location.href } // 记录当前访问路径
      next({ path: '/login', replace: true, query }) // 登录成功后再返回来
    }
  }
})