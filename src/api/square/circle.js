import request from '@/utils/request'

export function getMyCircles() {
  return request({
    url: '/api/base/circle/my',
    method: 'get'
  })
}