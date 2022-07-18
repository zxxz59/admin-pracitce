import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 6000
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      // 这个项目自带Bearer
      config.headers.Authorization = `${store.getters.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

//  response interceptor
service.interceptors.response.use(
  (response) => {
    const { data, meta } = response.data
    if (meta.status === 200 || meta.status === 201 || meta.status === 204) {
      return data
    } else {
      console.log(meta)
      Message.error(meta.msg)
      return Promise.reject(new Error(meta.msg))
    }
  },
  (error) => {
    // TODO不知道过期是什么状态
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 10002
    ) {
      store.dispatch('user/logout')
      router.push('/login')
    } else {
      Message.error(error.message)
    }
    return Promise.reject(error)
  }
)
export default service
