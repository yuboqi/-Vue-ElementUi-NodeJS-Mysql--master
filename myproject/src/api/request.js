// 基于axios封装网络请求
import theAxios from 'axios'
// import nProgress from 'nprogress'
// import router from '@/router'
// import { Notify } from 'vant'
// import { getToken, removeToken } from '@/utils/token'
const request = theAxios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 20000
})

// // 请求拦截器
// request.interceptors.request.use((config) => {
//   nProgress.start()
//   // ?. 可选链操操作符
//   if (getToken()?.length > 0 && config.headers.Authorization === undefined) {
//     config.headers.Authorization = `Bearer ${getToken()}`
//   }
//   return config
// })

// // 响应拦截器
// request.interceptors.response.use((response) => {
//   nProgress.done()
//   return response
// }, (error) => {
//   if (error.response.status === 401) {
//     Notify({ type: 'warning', message: '身份已过期' })
//     removeToken()
//     router.replace({ path: `/login?path=${router.currentRoute.fullPath}` })
//   }
//   return Promise.reject(new Error('false response', error))
// })

export default ({ url, method = 'GET', params = {}, data = {}, headers = {} }) => {
  return request({
    url,
    method,
    params,
    data,
    headers
  })
}
