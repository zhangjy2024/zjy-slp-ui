import request from '@/utils/request'

export function getMyNotifies() {
  return request({
    url: '/api/base/sys/notify/my',
    method: 'get'
  })
}

export function getGroupNotifies(param) {
  return request({
    url: '/api/base/sys/notify/group',
    method: 'get',
    params: param
  })
}
