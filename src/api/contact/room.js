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

export function getMyCreateRooms() {
  return request({
    url: '/api/base/room/my/create',
    method: 'get',
  })
}

export function getMyAdminRooms() {
  return request({
    url: '/api/base/room/my/admin',
    method: 'get',
  })
}

export function getMyJoinRooms() {
  return request({
    url: '/api/base/room/my/join',
    method: 'get',
  })
}

export function searchMyRooms(param) {
  return request({
    url: '/api/base/room/search',
    method: 'get',
    params: param
  })
}

export function getRoomInfo(param) {
  return request({
    url: '/api/base/room/info',
    method: 'get',
    params: param
  })
}

export function getRoomMessages(param) {
  return request({
    url: '/api/base/contact/message/room',
    method: 'get',
    params: param
  })
}