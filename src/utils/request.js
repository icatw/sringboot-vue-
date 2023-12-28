import axios from 'axios'
import router from '@/router/index'
import Element from 'element-ui'

const request = axios.create({
  baseURL: 'http://localhost:9888/',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

request.interceptors.request.use(config => {
  config.headers.Authorization = localStorage.getItem('token')
  return config
}, error => {
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(
  response => {
    const headers = response.headers
    if (headers['content-type'] === 'application/octet-stream;charset=UTF-8') {
      return response.data
    }
    // console.log(response)
    const res = response.data
    if (res.code === 200) {
      Element.Message.success(res.message)
      return res
    } else {
      if (res instanceof Blob) {
        //下载文件
        router.push('/login')
        Element.Message.error('请先登录再下载壁纸！')
        return Promise.reject(response.data.message)
      }
      Element.Message.error(!res.message ? '系统异常' : res.message)
      if (res.code === 101) {
        router.push('/login')
      }
      return Promise.reject(response.data.message)
    }
  },
  error => {
    // console.log(error)
    if (error.response.data) {
      error.massage = error.response.data.message
    }
    if (error.response.status === 403) {
      router.push('/login')
    }
    Element.Message.error(error.massage, {
      duration: 3000
    })
    return Promise.reject(error)
  }
)

export default request
