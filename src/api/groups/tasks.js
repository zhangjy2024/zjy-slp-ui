import request from '@/utils/request'

export function getMyTasks() {
  return request({
    url: '/api/base/tasks/my',
    method: 'get'
  })
}