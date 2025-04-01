import request from '@/utils/request'

export function getMyRooms() {
  return request({
    url: '/api/base/room/my',
    method: 'get'
  })
}

export function getGroupRooms(param) {
  return request({
    url: '/api/base/room/groupRooms',
    method: 'get',
    params: param
  })
}