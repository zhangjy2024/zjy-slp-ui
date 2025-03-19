import request from '@/utils/request'

export function getMyRooms() {
  return request({
    url: '/api/base/room/my',
    method: 'get'
  })
}