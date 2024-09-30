import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogOut } from "@/api/index";
import { setToken, getToken, removeToken } from "@/utils/token";
export default {
  namespaced: true,
  state: {
    code: '',
    // token: ''
    token: getToken() || '',
    userInfo: ''
  },
  actions: {
    //获取验证码
    async getCode({ commit }, phone) {
      const result = await reqGetCode(phone)
      if (result.code == 200) {
        commit("GETCODE", result.data)
        return 'ok'
      }
    },
    // 用户注册
    async userRegister({ commit }, user) {
      const result = await reqUserRegister(user)
      if (result.code == 200) {
        return 'ok'
      }
      else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 用户登录
    async userLogin({ commit }, data) {
      const result = await reqUserLogin(data)
      if (result.code == 200) {
        commit('USERLOGIN', result.data.token)
        return 'ok'
      }
    },
    //获取用户信息
    async getUserInfo({ commit }) {
      const result = await reqUserInfo()
      if (result.code == 200) {
        commit('USERINFO', result.data)
        return 'ok'
      }
      else {
        return Promise.reject(new Error(result.message))
      }
    },
    //退出登录
    async userLogout({ commit }) {
      // 只是向服务器发起一次请求，通知服务器清除token
      const result = await reqLogOut()
      if (result.code == 200) {
        commit("CLEAR")
        return 'ok'
      }
      else {
        return Promise.reject(new Error(result.message))
      }
    }
  },
  mutations: {
    //获取验证码
    GETCODE(state, code) {
      state.code = code
    },
    // 用户登录
    USERLOGIN(state, token) {
      state.token = token
      setToken(token)
    },
    //获取用户信息
    USERINFO(state, userInfo) {
      state.userInfo = userInfo
    },
    // 清除本地数据
    CLEAR(state) {
      state.token = ''
      state.userInfo = ''
      removeToken()
    }
  },
  getters: {
  }
}