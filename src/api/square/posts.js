import request from '@/utils/request'

export function getMyPosts() {
  return request({
    url: '/api/base/square/posts/my',
    method: 'get'
  })
}

export function getPostsDetail() {
  return request({
    url: '/api/base/square/posts/detail',
    method: 'get'
  })
}