import request from '@/utils/request'

export function getMyTasks() {
  return request({
    url: '/api/base/tasks/my',
    method: 'get'
  })
}

export function getGroupTasks(param) {
  return request({
    url: '/api/base/tasks/groupTasks',
    method: 'get',
    params: param
  })
}

