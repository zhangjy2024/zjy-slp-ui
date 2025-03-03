import axios from "axios";
import { Message, MessageBox } from "element-ui";
import router from "@/router";

const service = axios.create({
  baseURL: '',
  timeout: 60000 * 10
})

service.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('access_token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    console.log('请求异常', error)
    return Promise.reject(error)
  }
);

service.interceptors.response.use(

  (response) => {
    const res = response.data
    if (res.code && res.code !== 200) {
      // 505状态：表示用户访问了不该访问的连接，后端认为这次请求是攻击行为
      if (res.code === 505) {
        MessageBox({ type: 'error', showClose: false, closeOnClickModal: false, showConfirmButton: false, message: res.error });
        return Promise.reject(res.error ? res.error : '操作失败！')
      }
      // 500状态：表示业务异常
      if (res.code === 500) {
        Message({
          message: res.error || '操作失败！',
          type: 'error',
          duration: 3 * 1000
        })
        return Promise.reject(res.error ? res.error : '操作失败！')
      }
      // 后端异常
      return Promise.reject(new Error(res.error || '网络异常，请重试！'))
    } else {
      return response
    }
  },
  (error) => {
    const { response, config: { url } } = error
    
    if (response.status === 401) {
      Message({ message: '登录状态超时，请重新登录！', type: 'error', duration: 3 * 1000 })
      router.replace('/login')
      return
    }

    if (response.status === 400) {
      Message({ message: response.data.message ? response.data.message: '用户名或密码错误！', type: 'error', duration: 3 * 1000 })
      return
    }

    Message({ message: '服务异常，请稍后重试！', type: 'error', duration: 3 * 1000 })
  }
)

export default service