import request from '@/utils/request'
export const loginAPI = (data) =>
  request({
    method: 'POST',
    url: 'login',
    data
  })
