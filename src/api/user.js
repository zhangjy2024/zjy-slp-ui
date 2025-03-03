import request from '@/utils/request'
import qs from 'qs'

/**
 * 用户登录
 */
export async function userLoginAsync(data) {
  return request({
    url: '/oauth2/token',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

/**
 * 获取当前登录用户信息(异步)
 */
export async function currentUserAsync() {
  return request({
    url: '/api/base/user/current/login',
    method: 'get'
  })
}

/**
 * 获取当前登录用户信息
 */
export async function currentUser() {
  return request({
    url: '/api/base/user/current/login',
    method: 'get'
  })
}