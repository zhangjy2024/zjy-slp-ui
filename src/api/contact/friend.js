import request from '@/utils/request'

export function getMyFriends() {
  return request({
    url: '/api/base/contact/my',
    method: 'get'
  })
}

export function searchMyFriends(param) {
  return request({
    url: '/api/base/contact/search',
    method: 'get',
    params: param
  })
}

export function getFriendMessages(param) {
  return request({
    url: '/api/base/contact/message/friend',
    method: 'get',
    params: param
  })
}

