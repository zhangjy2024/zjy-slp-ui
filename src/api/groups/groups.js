import request from '@/utils/request'

export function getMyGroups() {
  return request({
    url: '/api/base/groups/my',
    method: 'get'
  })
}

export function getMiniGroups() {
  return request({
    url: '/api/base/groups/miniGroups',
    method: 'get'
  })
}

export function getGroupDetailById(param) {
  return request({
    url: '/api/base/groups/detail',
    method: 'get',
    params: param
  })
}
