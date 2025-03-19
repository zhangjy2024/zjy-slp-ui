import request from '@/utils/request'

export function getMyPosts() {
  return request({
    url: '/api/base/square/posts/my',
    method: 'get'
  })
}