import axios from "axios";

// 利用axios对象的方法create，去创建一个axios实例
// 对于axios进行二次封装
const mockAxios = axios.create({
  baseURL: '/mock',
  timeout: 5000,
})
// 请求拦截器
mockAxios.interceptors.request.use((config) => {
  return config
})
// 响应拦截器
mockAxios.interceptors.response.use((res) => {
  return res.data
}, (err) => {
  return Promise.reject(new Error(err))
})

export default mockAxios