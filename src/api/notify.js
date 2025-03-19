import request from '@/utils/request'

export function getMyNotifys() {
  return request({
    url: '/api/base/sys/notify/my',
    method: 'get'
  })
}