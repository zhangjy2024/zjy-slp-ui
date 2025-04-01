import request from '@/utils/request'

export function getResourceListByGroupId(param) {
  return request({
    url: '/api/base/resource/groupsResource',
    method: 'get',
    params: param
  })
}