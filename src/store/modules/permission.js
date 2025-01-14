import { asyncRoutes, constantRoutes } from "@/router";
import Store from '@/store'

function hasPermission(roles, route) {
  if (route.meta && route.meta.code) {
    return roles.includes(route.meta.code)
  } else {
    return true
  }
}

export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if(tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
        if (tmp.children.length > 0)
          tmp.redirect = tmp.children[0].path
        }
      if (!(tmp.children && tmp.children.length === 0)) {
        res.push(tmp)
      }
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: [],
  routeFresh: true
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_ROUTES_FRESH: (state, data) => {
    state.routeFresh = data
    state.routes = []
    state.addRoutes = []
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let permRoles = []
      if (roles && typeof roles === 'string'){
        try {
          const rolesObj = JSON.parse(roles)
          if (rolesObj && rolesObj.roleCode === 'ROLE_ADMIN') {
            permRoles.push('systemSet')
          }
        } catch (e) {
          console.log('权限字段不为JSON', e)
        }
      }
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, permRoles)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}