import axios from "axios";
// 引入 nprogress 实现进度条
import nprogress from "nprogress";
import "nprogress/nprogress.css";
//在当前模块中引入store
import store from '@/store';
// 利用axios对象的方法create，去创建一个axios实例
// 对于axios进行二次封装
// http://gmall-h5-api.atguigu.cn/api
const _Axios = axios.create({
  baseURL: '/api',
  timeout: 5000,
})
// 请求拦截器
_Axios.interceptors.request.use((config) => {
  if (store.state.detail.uuid_token) {
    // 请求头添加一个字段(userTempId)：和后台老师商量好了
    config.headers.userTempId = store.state.detail.uuid_token
  }
  // 需要携带token带给服务器
  if (store.state.user.token) {
    config.headers.token = store.state.user.token
  }
  nprogress.start()
  return config
})
// 响应拦截器
_Axios.interceptors.response.use((res) => {
  nprogress.done()
  return res.data
}, (err) => {
  nprogress.done()
  return Promise.reject(new Error(err))
})

export default _Axios