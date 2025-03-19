import request from '@/utils/request'

export function getMyGroups() {
  return request({
    url: '/api/base/groups/my',
    method: 'get'
  })
}