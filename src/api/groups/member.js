import request from '@/utils/request'

export function getGroupMembersById(param) {
  return request({
    url: '/api/base/groups/member/list',
    method: 'get',
    params: param
  })
}